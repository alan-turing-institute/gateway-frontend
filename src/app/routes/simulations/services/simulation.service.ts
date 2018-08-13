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

  public activeJobId: string;
  public activeCaseId: string;

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
    this.activeCaseId = caseObject.id;
    this.activeJobId = null;
  }

  public activateJob(jobObject: Job) {
    this.clearState();
    this.activeJobId = jobObject.id;
    this.activeCaseId = null;
    this.setInitialValues(jobObject);
  }

  private setInitialValues(jobObject: Job) {
    // overwrite initial service values with those from the job
    this.initialValues = jobObject.values.map(obj => {
      return { name: obj.name, value: obj.value };
    });
    this.values = this.initialValues;
  }

  private clearState() {
    this.name = null;
    this.description = null;
    this.values.length = 0;
    this.initialValues.length = 0;
  }

  // helper methods for generatng request bodies
  public jobPatch(): JobPatch {
    return new JobPatch(this.name, this.description, this.values);
  }

  public upsertValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
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
  }

  public updateDescription(value: string) {
    this.description = value;
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
    console.log('DEBUG(simulation.service) jobPatch', this.jobPatch());
  }
}
