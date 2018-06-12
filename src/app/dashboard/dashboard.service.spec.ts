import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';

import { BaseRequestOptions,Response, XHRBackend, RequestMethod} from '@angular/http';
import {HttpHeaders, HttpClientModule, HttpClient} from '@angular/common/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { DashboardService } from './dashboard.service';

describe('Config Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    providers: [
      DashboardService,
      MockBackend
    ],
    imports: [
      HttpClientModule
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
