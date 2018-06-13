import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('output get job result', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should get jobs', () => {
    let testUrl = "/job";
    let response = {
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

    httpClient.get(testUrl)
      .subscribe(data =>     
        expect(data).toEqual(response)
        // expect(data).toBeDefined()
        //  expect(jobs.length).toBe(1);
        //  expect(jobs[0].id).toBe(1);
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });
});

// import {
//   TestBed,
//   getTestBed,
//   async,
//   inject
// } from '@angular/core/testing';

// import { BaseRequestOptions,Response, XHRBackend, RequestMethod} from '@angular/http';
// import {HttpHeaders, HttpClientModule, HttpClient} from '@angular/common/http';
// import {ResponseOptions} from '@angular/http';
// import {MockBackend, MockConnection} from '@angular/http/testing';
// import {JobInfo} from '../types/jobInfo';
// import { Observable } from 'rxjs/Observable';
// // import {JobTemplate} from '../types/jobTemplate';
// import { OutputService } from './output.service';

// describe('Output Service', () => {
//   let mockBackend: MockBackend;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         OutputService,
//         MockBackend,
//         // BaseRequestOptions,
//         // {
//         //   provide: HttpClient,
//         //   deps: [MockBackend, BaseRequestOptions],
//         //   useFactory:
//         //   (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//         //     return new HttpClient(backend, defaultOptions);
//         //   }
//         // }
//       ],
//       imports: [
//         HttpClientModule
//       ]
//     });
//     mockBackend = getTestBed().get(MockBackend);
//   }));

//   it('should get job config and info', done => {
//     let outputService: OutputService;

//     getTestBed().compileComponents().then(() => {
//         mockBackend.connections.subscribe(
//           (connection: MockConnection) => {
//             connection.mockRespond(new Response(
//               new ResponseOptions({
//                 body: {
//                   "data":{
//                       "1" : {
//                         "id" : "1",
//                         "job_type": "Changeover",
//                         "start_date" : "1 Jan 2017",
//                         "end_date" : "2 Jan 2017",
//                         "status" : "Complete",
//                         "output" : "./src/assets/img/generic_graph.png"
//                       },
//                       "2" : {
//                         "id" : "2",
//                         "job_type": "Changeover",
//                         "start_date" : "2 Jan 2017",
//                         "end_date" : "3 Jan 2017",
//                         "status" : "Complete",
//                         "output" : "./src/assets/img/generic_graph.png"
//                       },
//                       "3" : {
//                         "id" : "3",
//                         "job_type": "Stirred Tank",
//                         "start_date" : "3 Jan 2017",
//                         "end_date" : "4 Jan 2017",
//                         "status" : "Complete",
//                         "output" : "./src/assets/img/generic_graph.png"
//                       }
//                     }
//                 }
//               })));
//           });

//           outputService = getTestBed().get(OutputService);
//           expect(outputService).toBeDefined();

//           outputService.getJob().subscribe((components: JobInfo) => {
//             expect(components).toBeDefined();
//           })

//         done();
//     });
//   });
// })
