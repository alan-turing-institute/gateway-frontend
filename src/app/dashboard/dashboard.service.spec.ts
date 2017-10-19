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
import { JobInfo } from '../types/jobInfo';
import { DashboardService } from './dashboard.service';

describe('Dashboard Service', () => {
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

it('should get job info', done => {
  let dashboardService: DashboardService;

  getTestBed().compileComponents().then(() => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: {
              "data":{
                  "1" : {
                    "id" : "1",
                    "job_type": "Changeover",
                    "start_date" : "1 Jan 2017",
                    "end_date" : "2 Jan 2017",
                    "status" : "Complete",
                    "output" : "./src/assets/img/generic_graph.png"
                  },
                  "2" : {
                    "id" : "2",
                    "job_type": "Changeover",
                    "start_date" : "2 Jan 2017",
                    "end_date" : "3 Jan 2017",
                    "status" : "Complete",
                    "output" : "./src/assets/img/generic_graph.png"
                  },
                  "3" : {
                    "id" : "3",
                    "job_type": "Stirred Tank",
                    "start_date" : "3 Jan 2017",
                    "end_date" : "4 Jan 2017",
                    "status" : "Complete",
                    "output" : "./src/assets/img/generic_graph.png"
                  }
                }
            }
          })));
        });

        dashboardService = getTestBed().get(DashboardService);
        expect(dashboardService).toBeDefined();

        dashboardService.getJobsData().subscribe((components: JobInfo []) => {
            expect(components).toBeDefined();
            // expect(blogs.length).toEqual(1);
            // expect(blogs[0].id).toEqual(26);
            //console.log(components)
            done();
      });
    });
  });
});
