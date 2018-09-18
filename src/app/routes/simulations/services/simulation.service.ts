import { Injectable } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

import { MiddlewareService } from '@core/services/middleware.service';
import { Case, CaseSummary, CaseSelection } from '../models/case';
import { Job, JobSummary, JobPatch } from '../models/job';
import { Value } from '../models/value';
import { Output } from '../models/output';

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
  public metrics: object;

  constructor(
    private middlewareService: MiddlewareService,
    public message: NzMessageService,
    private settingsService: SettingsService,
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
    this.metrics = null;
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
        return { name: obj.name, value: obj.value, units: obj.units };
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
  }

  public updateDescription(value: string) {
    this.description = value;
  }

  //  middleware connection functionality

  searchJobSummaries(name: string): Observable<JobSummary[]> {
    return this.middlewareService.searchJobSummaries(name);
  }

  refreshJobSummaries() {
    console.log('DEBUG(simulation.service) refresh');
    this.jobSummaries$ = this.middlewareService.getJobSummaries();
  }

  getCase(id: string): Observable<Case> {
    return this.middlewareService.getCase(id);
  }

  createJob(): Observable<object> {
    let author = this.settingsService.user.name;
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

  stopJob(id: string) {
    return this.middlewareService.stopJob(id).pipe(
      catchError(
        (err): any => {
          console.log(err);
          return empty();
        },
      ),
    );
  }

  deleteJob(id: string) {
    return this.middlewareService.deleteJob(id).pipe(
      catchError(
        (err): any => {
          console.log(err);
          return empty();
        },
      ),
      tap(_ => {
        console.log('DEBUG(simulation.service) in tap');
        this.refreshJobSummaries();
      }),
    );
  }

  getJob(id: string): Observable<Job> {
    return this.middlewareService.getJob(id);
  }

  getOutputs(id: string): Observable<Output[]> {
    return this.middlewareService.getOutputs(id);
  }

  downloadOutput(output: Output) {
    this.middlewareService.downloadOutput(output);
  }

  getMetrics(id: string) {
    return (
      this.middlewareService
        .getOutputs(id)
        // assume single "metrics" output is present
        .pipe(
          map(outputs => outputs.find(output => output.type === 'metrics')),
          switchMap(output =>
            this.middlewareService.getMetrics(output.destination),
          ),
        )
    );
  }

  // find(output => output.type === 'metrics')
  // dump state to console for debugging
  public debugState() {
    console.log('DEBUG(simulation.service) activeCaseId', this.activeCaseId);
    console.log('DEBUG(simulation.service) activeJobId', this.activeJobId);
    console.log('DEBUG(simulation.service) name', this.name);
    console.log('DEBUG(simulation.service) description', this.description);
    console.log('DEBUG(simulation.service) values', this.values);
    console.log('DEBUG(simulation.service) initialValues', this.initialValues);
    console.log('DEBUG(simulation.service) jobPatch', this.jobPatch());
  }
}
