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
import {InputComponent} from '../components/input/inputComponent';
import { ConfigDataService } from './configData.service';

describe('Case Service', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigDataService,
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

//   it('should run a test that finishes eventually', done => {
//   // kick off an asynchronous call in the background
//   setTimeout(() => {
//       done();
//   }, 500);
//   })


  it('should get a case by case id', done => {
    let caseService: ConfigDataService;
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                "name": "MyCase",
                "fields": [
                    {
                        "name": "tankA",
                        "child_fields": [
                            {
                                "name": "width",
                                "child_fields": [],
                                "specs": [
                                    {
                                        "name": "min",
                                        "id": 21,
                                        "value": "0.1"
                                    },
                                    {
                                        "name": "max",
                                        "id": 22,
                                        "value": "40"
                                    },
                                    {
                                        "name": "default",
                                        "id": 23,
                                        "value": "3"
                                    },
                                    {
                                        "name": "units",
                                        "id": 24,
                                        "value": "m"
                                    }
                                ]
                            }
                        ],
                        "specs": []
                    },
                ],
                "id": 3
            }
            })));
        });

        caseService = getTestBed().get(ConfigDataService);
        expect(caseService).toBeDefined();

        caseService.getTemplate("3").subscribe((template: any) => {
            expect(template).toBeDefined();
            expect(template['name']=="MyCase")
            expect(template['id']=="3");
            expect(template['fields'].length == 1);
            done();
        });
    });
  });

  it('should get a single job by job id', done => {
    let caseService: ConfigDataService;
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                "name": "TESTMINT",
                "user": "nbarlow",
                "status": "Not Started",
                "id": 1,
                "parent_case": {
                    "name": "MyCase",
                    "fields": [
                        {
                            "name": "tankA",
                            "child_fields": [
                                {
                                    "name": "width",
                                    "child_fields": [],
                                    "specs": [
                                        {
                                            "name": "min",
                                            "id": 21,
                                            "value": "0.1"
                                        },
                                        {
                                            "name": "max",
                                            "id": 22,
                                            "value": "40"
                                        },
                                        {
                                            "name": "default",
                                            "id": 23,
                                            "value": "3"
                                        },
                                        {
                                            "name": "units",
                                            "id": 24,
                                            "value": "m"
                                        }
                                    ]
                                }
                            ],
                            "specs": []
                        },
                    ],
                    "id": 3
                },
                "values": [
                    {
                        "name": "width",
                        "parent_template": null,
                        "id": 1,
                        "value": "3.35"
                    },
                ]
            }
          })));
        });

        caseService = getTestBed().get(ConfigDataService);
        expect(caseService).toBeDefined();

        caseService.getJob("1").subscribe((job: any) => {
            expect(job).toBeDefined();
            expect(job.id).toEqual(1);
            done();
        });
    });
  });

//   it('should get blogs async',
//     async(inject([BlogService], (blogService) => {
//       mockBackend.connections.subscribe(
//         (connection: MockConnection) => {
//           connection.mockRespond(new Response(
//             new ResponseOptions({
//                 body: [
//                   {
//                     id: 26,
//                     contentRendered: '<p><b>Hi there</b></p>',
//                     contentMarkdown: '*Hi there*'
//                   }]
//               }
//             )));
//         });

//       blogService.getBlogs().subscribe(
//         (data) => {
//           expect(data.length).toBe(1);
//           expect(data[0].id).toBe(26);
//           expect(data[0].contentMarkdown).toBe('*Hi there*');
//       });
//     })));

//   it('should fetch a single blog entry by a key',
//     async(inject([BlogService], (blogService) => {
//       mockBackend.connections.subscribe(
//         (connection: MockConnection) => {

//           // make sure the URL is correct
//           expect(connection.request.url).toMatch(/\/server\/api\/blogs\/3/);
//           connection.mockRespond(
//             new Response(
//               new ResponseOptions({
//                 body: {
//                   id: 3,
//                   contentRendered: '<p><b>Demo</b></p>',
//                   contentMarkdown: '*Demo*'
//                 }
//               }))
//           );
//         }
//       );

//       blogService.getBlog(3).subscribe(
//         (blogEntry) => {
//           expect(blogEntry.id).toBe(3);
//           expect(blogEntry.contentMarkdown).toBe('*Demo*');
//           expect(blogEntry.contentRendered).toBe('<p><b>Demo</b></p>')
//         }
//       );
//   })));

//   it('should insert new blog entries',
//     async(inject([BlogService], (blogService) => {
//       mockBackend.connections.subscribe((connection: MockConnection) => {
//         // is it the correct REST type for an insert? (POST)
//         expect(connection.request.method).toBe(RequestMethod.Post);
//         // okey dokey,
//         connection.mockRespond(new Response(new ResponseOptions({status: 201})));
//       });

//       let data: BlogEntry = new BlogEntry('Blog Entry', '<p><b>Hi</b></p>', '*Hi*', null);
//       blogService.saveBlog(data).subscribe(
//         (successResult) => {
//           expect(successResult).toBeDefined();
//           expect(successResult.status).toBe(201);
//         });
//     })));

//   it('should save updates to an existing blog entry',
//     async(inject([BlogService], (blogService) => {
//       mockBackend.connections.subscribe(connection => {
//         // is it the correct REST type for an update? (PUT)
//         expect(connection.request.method).toBe(RequestMethod.Put);
//         connection.mockRespond(new Response(new ResponseOptions({status: 204})));
//       });

//       let data: BlogEntry = new BlogEntry('Blog Entry', '<p><b>Hi</b></p>', '*Hi*', 10);
//       blogService.saveBlog(data).subscribe(
//         (successResult) => {
//           expect(successResult).toBeDefined();
//           expect(successResult.status).toBe(204);
//         });
//     })));

//   it('should delete an existing blog entry',
//     async(inject([BlogService], (blogService) => {
//       mockBackend.connections.subscribe(connection => {
//         expect(connection.request.method).toBe(RequestMethod.Delete);
//         connection.mockRespond(new ResponseOptions({status: 204}));
//       });

//       blogService.deleteBlogEntry(23).subscribe(
//         (successResult) => {
//           expect(successResult).toBeDefined();
//           expect(successResult.status).toBe(204);
//         },
//         (errorResult) => {
//           throw (errorResult);
//         });
//     })));
});