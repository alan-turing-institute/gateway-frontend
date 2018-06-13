import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('config get template', () => {
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

  it('should get template', () => {
    let testUrl = "/case/1";
    let response = {
        "id": 5,
        "name": "damBreak",
        "description": "OpenFOAM simulation of breaking dam",
        "thumbnail": "https://sgmiddleware.blob.core.windows.net/openfoam/thumbnails/damBreak.png",
        "fields": [
            {
                "child_fields": [
                    {
                        "child_fields": [],
                        "name": "density",
                        "specs": [
                            {
                                "value": "1",
                                "id": 70,
                                "name": "min"
                            },
                            {
                                "value": "2000",
                                "id": 71,
                                "name": "max"
                            },
                            {
                                "value": "1000",
                                "id": 72,
                                "name": "default"
                            },
                            {
                                "value": "kg/m^3",
                                "id": 73,
                                "name": "units"
                            },
                            {
                                "value": "Water_",
                                "id": 74,
                                "name": "prefix"
                            }
                        ]
                    },
                ],
                "name": "Water",
                "specs": [
                    {
                        "value": "Water_",
                        "id": 87,
                        "name": "prefix"
                    }
                ]
            },
        ]
    }
    

    httpClient.get(testUrl)
      .subscribe(data =>     
        expect(data).toEqual(response)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    expect(response.description.length).toBeGreaterThan(0);
    expect(response.fields.length).toBeGreaterThan(0);
    expect(response.fields[0].child_fields.length).toBeGreaterThan(0);
    expect(response.fields[0].child_fields[0].name.length).toBeGreaterThan(0);
    expect(response.fields[0].child_fields[0].specs.length).toBe(5);
    expect(response.fields[0].child_fields[0].specs[0].value.length).toBeGreaterThan(0);
    expect(response.fields[0].child_fields[0].specs[0].name.length).toBeGreaterThan(0);
    req.flush(response);
  });

  afterEach(() => {
    httpTestingController.verify();
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
// import {InputComponent} from '../components/input/inputComponent';
// import { ConfigDataService } from './configData.service';
// import { Observable } from 'rxjs/Observable';

// describe('Case Service', () => {
//   let mockBackend: MockBackend;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         ConfigDataService,
//         MockBackend,
//       ],
//       imports: [
//         HttpClientModule
//       ]
//     });
//     mockBackend = getTestBed().get(MockBackend);
//   }));

// //   it('should run a test that finishes eventually', done => {
// //   // kick off an asynchronous call in the background
// //   setTimeout(() => {
// //       done();
// //   }, 500);
// //   })


//   it('should get a case by case id', done => {
//     let caseService: ConfigDataService;
//     getTestBed().compileComponents().then(() => {
//       mockBackend.connections.subscribe(
//         (connection: MockConnection) => {
//           connection.mockRespond(new Response(
//             new ResponseOptions({
//               body: {
//                 "name": "MyCase",
//                 "fields": [
//                     {
//                         "name": "tankA",
//                         "child_fields": [
//                             {
//                                 "name": "width",
//                                 "child_fields": [],
//                                 "specs": [
//                                     {
//                                         "name": "min",
//                                         "id": 21,
//                                         "value": "0.1"
//                                     },
//                                     {
//                                         "name": "max",
//                                         "id": 22,
//                                         "value": "40"
//                                     },
//                                     {
//                                         "name": "default",
//                                         "id": 23,
//                                         "value": "3"
//                                     },
//                                     {
//                                         "name": "units",
//                                         "id": 24,
//                                         "value": "m"
//                                     }
//                                 ]
//                             }
//                         ],
//                         "specs": []
//                     },
//                 ],
//                 "id": 3
//             }
//             })));
//         });

//         caseService = getTestBed().get(ConfigDataService);
//         expect(caseService).toBeDefined();

//         caseService.getTemplate("3").subscribe((template: any) => {
//             expect(template).toBeDefined();
//             expect(template['name']=="MyCase")
//             expect(template['id']=="3");
//             expect(template['fields'].length == 1);
//             done();
//         });
//     });
//   });

//   it('should get a single job by job id', done => {
//     let caseService: ConfigDataService;
//     getTestBed().compileComponents().then(() => {
//       mockBackend.connections.subscribe(
//         (connection: MockConnection) => {
//           connection.mockRespond(new Response(
//             new ResponseOptions({
//               body: {
//                 "name": "TESTMINT",
//                 "user": "nbarlow",
//                 "status": "Not Started",
//                 "id": 1,
//                 "parent_case": {
//                     "name": "MyCase",
//                     "fields": [
//                         {
//                             "name": "tankA",
//                             "child_fields": [
//                                 {
//                                     "name": "width",
//                                     "child_fields": [],
//                                     "specs": [
//                                         {
//                                             "name": "min",
//                                             "id": 21,
//                                             "value": "0.1"
//                                         },
//                                         {
//                                             "name": "max",
//                                             "id": 22,
//                                             "value": "40"
//                                         },
//                                         {
//                                             "name": "default",
//                                             "id": 23,
//                                             "value": "3"
//                                         },
//                                         {
//                                             "name": "units",
//                                             "id": 24,
//                                             "value": "m"
//                                         }
//                                     ]
//                                 }
//                             ],
//                             "specs": []
//                         },
//                     ],
//                     "id": 3
//                 },
//                 "values": [
//                     {
//                         "name": "width",
//                         "parent_template": null,
//                         "id": 1,
//                         "value": "3.35"
//                     },
//                 ]
//             }
//           })));
//         });

//         caseService = getTestBed().get(ConfigDataService);
//         expect(caseService).toBeDefined();

//         caseService.getJob("1").subscribe((job: any) => {
//             expect(job).toBeDefined();
//             expect(job.id).toEqual(1);
//             done();
//         });
//     });
//   });

// //   it('should get blogs async',
// //     async(inject([BlogService], (blogService) => {
// //       mockBackend.connections.subscribe(
// //         (connection: MockConnection) => {
// //           connection.mockRespond(new Response(
// //             new ResponseOptions({
// //                 body: [
// //                   {
// //                     id: 26,
// //                     contentRendered: '<p><b>Hi there</b></p>',
// //                     contentMarkdown: '*Hi there*'
// //                   }]
// //               }
// //             )));
// //         });

// //       blogService.getBlogs().subscribe(
// //         (data) => {
// //           expect(data.length).toBe(1);
// //           expect(data[0].id).toBe(26);
// //           expect(data[0].contentMarkdown).toBe('*Hi there*');
// //       });
// //     })));

// //   it('should fetch a single blog entry by a key',
// //     async(inject([BlogService], (blogService) => {
// //       mockBackend.connections.subscribe(
// //         (connection: MockConnection) => {

// //           // make sure the URL is correct
// //           expect(connection.request.url).toMatch(/\/server\/api\/blogs\/3/);
// //           connection.mockRespond(
// //             new Response(
// //               new ResponseOptions({
// //                 body: {
// //                   id: 3,
// //                   contentRendered: '<p><b>Demo</b></p>',
// //                   contentMarkdown: '*Demo*'
// //                 }
// //               }))
// //           );
// //         }
// //       );

// //       blogService.getBlog(3).subscribe(
// //         (blogEntry) => {
// //           expect(blogEntry.id).toBe(3);
// //           expect(blogEntry.contentMarkdown).toBe('*Demo*');
// //           expect(blogEntry.contentRendered).toBe('<p><b>Demo</b></p>')
// //         }
// //       );
// //   })));

// //   it('should insert new blog entries',
// //     async(inject([BlogService], (blogService) => {
// //       mockBackend.connections.subscribe((connection: MockConnection) => {
// //         // is it the correct REST type for an insert? (POST)
// //         expect(connection.request.method).toBe(RequestMethod.Post);
// //         // okey dokey,
// //         connection.mockRespond(new Response(new ResponseOptions({status: 201})));
// //       });

// //       let data: BlogEntry = new BlogEntry('Blog Entry', '<p><b>Hi</b></p>', '*Hi*', null);
// //       blogService.saveBlog(data).subscribe(
// //         (successResult) => {
// //           expect(successResult).toBeDefined();
// //           expect(successResult.status).toBe(201);
// //         });
// //     })));

// //   it('should save updates to an existing blog entry',
// //     async(inject([BlogService], (blogService) => {
// //       mockBackend.connections.subscribe(connection => {
// //         // is it the correct REST type for an update? (PUT)
// //         expect(connection.request.method).toBe(RequestMethod.Put);
// //         connection.mockRespond(new Response(new ResponseOptions({status: 204})));
// //       });

// //       let data: BlogEntry = new BlogEntry('Blog Entry', '<p><b>Hi</b></p>', '*Hi*', 10);
// //       blogService.saveBlog(data).subscribe(
// //         (successResult) => {
// //           expect(successResult).toBeDefined();
// //           expect(successResult.status).toBe(204);
// //         });
// //     })));

// //   it('should delete an existing blog entry',
// //     async(inject([BlogService], (blogService) => {
// //       mockBackend.connections.subscribe(connection => {
// //         expect(connection.request.method).toBe(RequestMethod.Delete);
// //         connection.mockRespond(new ResponseOptions({status: 204}));
// //       });

// //       blogService.deleteBlogEntry(23).subscribe(
// //         (successResult) => {
// //           expect(successResult).toBeDefined();
// //           expect(successResult.status).toBe(204);
// //         },
// //         (errorResult) => {
// //           throw (errorResult);
// //         });
// //     })));
// });