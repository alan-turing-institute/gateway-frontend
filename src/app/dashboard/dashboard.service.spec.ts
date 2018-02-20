import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';

import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { DashboardService } from './dashboard.service';

describe('Config Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    providers: [
      DashboardService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
    ],
    imports: [
      HttpModule
    ]
  });
  mockBackend = getTestBed().get(MockBackend);
}));

it('should get jobs', done => {
  let dashboardService: DashboardService;

  getTestBed().compileComponents().then(() => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                  "name": "TESTMINT",
                  "user": "nbarlow",
                  "status": "Not Started",
                  "links": {
                      "self": "/job/1",
                      "case": "/case/3"
                  },
                  "id": 1
              }
            ]
          })));
        });

        dashboardService = getTestBed().get(DashboardService);
        expect(dashboardService).toBeDefined();

        dashboardService.getJobsData().subscribe((jobs: any []) => {
            expect(jobs).toBeDefined();
            expect(jobs.length).toBe(1);
            expect(jobs[0].id).toBe(1);
            done();
      });
    });
  });
});
