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
import {JobInfo} from '../types/jobInfo';
// import {JobTemplate} from '../types/jobTemplate';
import { OutputService } from './output.service';

describe('Output Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OutputService,
        MockBackend,
        // BaseRequestOptions,
        // {
        //   provide: HttpClient,
        //   deps: [MockBackend, BaseRequestOptions],
        //   useFactory:
        //   (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
        //     return new HttpClient(backend, defaultOptions);
        //   }
        // }
      ],
      imports: [
        HttpClientModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));

  it('should get job config and info', done => {
    let outputService: OutputService;

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

          outputService = getTestBed().get(OutputService);
          expect(outputService).toBeDefined();

          outputService.getJob().subscribe((components: JobInfo) => {
            expect(components).toBeDefined();
          })

        done();
    });
  });
})
