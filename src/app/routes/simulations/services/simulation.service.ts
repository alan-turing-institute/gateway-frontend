import { Injectable } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { MiddlewareService } from '@core/services/middleware.service';
import { Case, CaseSummary, CaseSelection } from '../models/case';
import { Job, JobSummary, JobPatch } from '../models/job';
import { Value } from '../models/value';

@Injectable()
export class SimulationService {
  public caseSummaries$: Observable<CaseSummary[]>;
  public jobSummaries$: Observable<JobSummary[]>;

  public active: string;
  public activeJobId: string;
  public activeCaseId: string;

  public initialName: string;
  public initialDescription: string;
  public initialValues: Value[] = [];

  // modified state
  public name: string;
  public description: string;
  public values: Value[] = [];

  constructor(
    private middlewareService: MiddlewareService,
    public message: NzMessageService,
  ) {
    this.caseSummaries$ = this.middlewareService.getCaseSummaries();
    this.jobSummaries$ = this.middlewareService.getJobSummaries();
  }

  public activateCase(caseObject: Case) {
    this.clearState();
    this.active = 'case';
    this.activeCaseId = caseObject.id;
    this.activeJobId = null;
    this.initialName = caseObject.name;
    this.initialDescription = caseObject.description;
  }

  public activateJob(jobObject: Job) {
    this.clearState();
    this.active = 'job';
    this.activeJobId = jobObject.id;
    this.activeCaseId = null;
    this.initialName = jobObject.name;
    this.initialDescription = jobObject.description;
    this.setInitialValues(jobObject);
  }

  private clearState() {
    this.active = null;
    this.name = null;
    this.description = null;
    this.values.length = 0;
    this.initialName = null;
    this.initialDescription = null;
    this.initialValues.length = 0;
  }

  // helper methods for generatng request bodies
  public jobPatch(): JobPatch {
    return new JobPatch(this.name, this.description, this.values);
  }

  public upsertValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
  }

  private isJob(simulation: Job | Case): simulation is Job {
    return (<Job>simulation).parent_case !== undefined;
  }

  private setInitialValues(simulation: Job | Case) {
    // extract values from Job.values
    if (this.isJob(simulation)) {
      this.initialValues = simulation.values.map(obj => {
        return { name: obj.name, value: obj.value };
      });
    }
  }

  public getInitialValue(name: string): string {
    let valueObject = this.initialValues.find(obj => {
      return obj['name'] === name;
    });

    if (valueObject) {
      return valueObject.value;
    } else {
      return null;
    }
  }

  public updateName(value: string) {
    this.name = value;
    this.debugState();
  }

  public updateDescription(value: string) {
    this.description = value;
    this.debugState();
  }

  //  middleware connection functionality

  searchJobSummaries(name: string): Observable<JobSummary[]> {
    return this.middlewareService.searchJobSummaries(name);
  }

  getCase(id: string): Observable<Case> {
    return this.middlewareService.getCase(id);
  }

  createJob(): Observable<object> {
    let author = 'mock-author';

    let caseSelection = new CaseSelection(
      this.activeCaseId,
      author,
      this.name,
      this.description,
    );

    return this.middlewareService.createJob(caseSelection).pipe(
      catchError(
        (err): any => {
          console.log(err);
          this.message.create('error', this.name);
          return empty();
        },
      ),
    );
  }

  updateJob(id: string) {
    let patch = this.jobPatch();
    return this.middlewareService.patchJob(id, patch).pipe(
      catchError(
        (err): any => {
          console.log(err);
          return empty();
        },
      ),
    );
  }

  startJob(id: string) {
    return this.middlewareService.startJob(id).pipe(
      catchError(
        (err): any => {
          console.log(err);
          return empty();
        },
      ),
    );
  }

  getJob(id: string): Observable<Job> {
    return this.middlewareService.getJob(id);
  }

  // dump state to console for debugging
  private debugState() {
    console.log('DEBUG(simulation.service) activeCaseId', this.activeCaseId);
    console.log('DEBUG(simulation.service) activeJobId', this.activeJobId);
    console.log('DEBUG(simulation.service) name', this.name);
    console.log('DEBUG(simulation.service) description', this.description);
    console.log('DEBUG(simulation.service) values', this.values);
    console.log('DEBUG(simulation.service) initialValues', this.initialValues);
    console.log('DEBUG(simulation.service) jobPatch', this.jobPatch());
  }
}
