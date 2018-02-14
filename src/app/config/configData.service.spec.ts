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

describe('Job Service', () => {
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

  it('should run a test that finishes eventually', done => {
  // kick off an asynchronous call in the background
  setTimeout(() => {
      done();
  }, 500);
  })


  it('should get jobs', done => {
    let jobService: ConfigDataService;
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                    "user": "nbarlow",
                    "links": {
                        "self": "/job/1",
                        "case": "/case/3"
                    },
                    "id": 1,
                    "name": "TESTMINT"
                },
                {
                    "user": "myong",
                    "links": {
                        "self": "/job/22",
                        "case": "/case/2"
                    },
                    "id": 22,
                    "name": "where am I again"
                }
            ]}
          )));
        });

        jobService = getTestBed().get(ConfigDataService);
        expect(jobService).toBeDefined();

        jobService.getTemplate("2").subscribe((jobs: any) => {
            expect(jobs.length).toBeDefined();
            expect(jobs.length).toEqual(2);
            expect(jobs[0].id).toEqual(1);
            expect(jobs[0].name).toEqual("TESTMINT");
            expect(jobs[0].links.self).toEqual("/job/1");
            expect(jobs[0].links.case).toEqual("/case/3");
            done();
        });
    });
  });

  it('should get a job', done => {
    let jobService: ConfigDataService;
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                "values": [
                    {
                        "parent_template": null,
                        "value": "3000",
                        "id": 13,
                        "name": "density"
                    },
                ],
                "name": "where am I again",
                "user": "Myong",
                "parent_case": {
                    "fields": [
                        {
                            "child_fields": [
                                {
                                    "child_fields": [],
                                    "name": "density",
                                    "specs": [
                                        {
                                            "value": "200",
                                            "id": 9,
                                            "name": "min"
                                        },
                                        {
                                            "value": "4000",
                                            "id": 10,
                                            "name": "max"
                                        },
                                        {
                                            "value": "1000",
                                            "id": 11,
                                            "name": "default"
                                        },
                                        {
                                            "value": "kg/m^3",
                                            "id": 12,
                                            "name": "units"
                                        }
                                    ]
                                },
                            ],
                            "name": "fluidA",
                            "specs": []
                        }
                    ],
                    "id": 2,
                    "name": "fluids_R_us"
                },
                "id": 22
            }
          })));
        });

        jobService = getTestBed().get(ConfigDataService);
        expect(jobService).toBeDefined();

        jobService.getJob("22").subscribe((job: any) => {
            expect(job).toBeDefined();
            expect(job.id).toEqual(22);
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