import { Injectable } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { SettingsService } from '@delon/theme';

import { MiddlewareService } from '@core/services/middleware.service';
import { Case, CaseSummary, CaseSelection } from '../models/case';
import { Job, JobSummary, JobPatch } from '../models/job';
import { Value } from '../models/value';
import { Output } from '../models/output';

@Injectable()
export class SimulationService {
  private _caseSummaries$: BehaviorSubject<CaseSummary[]>;
  private caseSummaries: CaseSummary[];

  private _jobSummaries$: BehaviorSubject<JobSummary[]>;
  private jobSummaries: JobSummary[];

  public timerSubscription: AnonymousSubscription;

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
    private settingsService: SettingsService,
  ) {
    this._caseSummaries$ = new BehaviorSubject([]);
    this.caseSummaries = [];
    this._jobSummaries$ = new BehaviorSubject([]);
    this.jobSummaries = [];
    // this.authRefresh();
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

  get caseSummaries$(): Observable<CaseSummary[]> {
    return this._caseSummaries$.asObservable();
  }

  get jobSummaries$(): Observable<JobSummary[]> {
    return this._jobSummaries$.asObservable();
  }

  public refreshCaseSummaries() {
    this.middlewareService
      .getCaseSummaries()
      .subscribe(state => this._caseSummaries$.next(state));
  }

  public refreshJobSummaries() {
    this.middlewareService
      .getJobSummaries()
      .subscribe(state => this._jobSummaries$.next(state));
  }

  public authRefresh(): void {
    let refreshInterval = 10000;
    this.timerSubscription = timer(0, refreshInterval).subscribe(() => {
      this.refreshJobSummaries();
    });
  }

  public cancelAutoRefresh(): void {
    this.timerSubscription.unsubscribe();
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

  searchJobSummaries(name: string, exact = true): Observable<JobSummary[]> {
    return this.middlewareService.searchJobSummaries(name, exact);
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
    this.middlewareService
      .deleteJob(id)
      .pipe(
        catchError(
          (err): any => {
            console.log(err);
            return empty();
          },
        ),
      )
      .subscribe(() => this.refreshJobSummaries());
  }

  getJob(id: string): Observable<Job> {
    return this.middlewareService.getJob(id);
  }

  downloadOutput(output: Output) {
    this.middlewareService.downloadOutput(output);
  }

  getOutputs(id: string): Observable<Output[]> {
    return this.middlewareService.getOutputs(id);
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

  getClassifier(output: Output) {
    return this.middlewareService.getClassifier(output);
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
