import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Case, CaseSummary, CaseSelection } from '../models/case';
import { Job, JobSummary, JobPatch } from '../models/job';
import { Value } from '../models/value';

import { environment } from '@env/environment';
import { MiddlewareService } from '@core/services/middleware.service';

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

  constructor(private middlewareService: MiddlewareService) {
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

  debugState() {
    console.log('DEBUG(simulation.service) activeCaseId', this.activeCaseId);
    console.log('DEBUG(simulation.service) activeJobId', this.activeJobId);
    console.log('DEBUG(simulation.service) name', this.name);
    console.log('DEBUG(simulation.service) description', this.description);
    console.log('DEBUG(simulation.service) values', this.values);
    console.log('DEBUG(simulation.service) jobPatch', this.jobPatch());
  }

  public upsertValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
    // this.debugState();
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
    // this.debugState();
  }

  public updateDescription(value: string) {
    this.description = value;
    // this.debugState();
  }

  //  middleware connection functionality

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
}
