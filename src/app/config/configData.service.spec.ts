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

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
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

    // it('should run a test that finishes eventually', done => {
    // // kick off an asynchronous call in the background
    // setTimeout(() => {
    //     console.log('now we are done');
    //     done();
    // }, 500);
    // })


  // it('should get jobs', done => {
  //   let jobService: ConfigDataService;

  //   getTestBed().compileComponents().then(() => {
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({
  //             body: {  
  //               "families": [{
  //                   "label": "Viscosity information",
  //                   "name": "viscosity_properties",
  //                   "collapse": true,
  //                   "parameters": [{
  //                       "name": "viscosity_phase_1",
  //                       "type": "slider",
  //                       "label": "Viscosity: Phase 1",
  //                       "units": "Pa s",
  //                       "type_value": "float",
  //                       "min_value": "10",
  //                       "max_value": "20",
  //                       "value": "13",
  //                       "options": [],
  //                       "help": "",
  //                       "disabled":false
  //                     },
  //                     {
  //                       "name": "viscosity_phase_2",
  //                       "type": "slider",
  //                       "label": "Viscosity: Phase 2",
  //                       "units": "Pa s",
  //                       "type_value": "float",
  //                       "min_value": "10",
  //                       "max_value": "20",
  //                       "value": "17",
  //                       "options": ["17"],
  //                       "help": "A description of surface tension?",
  //                       "disabled":false
  //                     }
  //                   ]
  //                 }
  //               ],
  //               "inputs": [{
  //                 "destination_path": "project/case/",
  //                 "source_uri": "https://science-gate-way-middleware.azurewebstes.net/resources/case/Changeover/inputs/mesh_file.stl"
  //               }],
  //               "scripts": [{
  //                 "destination_path": "project/case/",
  //                 "source_uri": "https://science-gate-way-middleware.azurewebstes.net/resources/case/Changeover/scripts/run_job.sh",
  //                 "action": "RUN"
  //               }],
  //               "user": "lrmason",
  //               "templates": [{
  //                 "destination_path": "project/case/",
  //                 "source_uri": "https://science-gate-way-middleware.azurewebstes.net/resources/case/Changeover/templates/Blue.nml"
  //               }],
  //               "id": "d769843b-6f37-4939-96c7-c382c3e74b46",
  //               "name": "Talcum powder to flour",
  //               "description": "Job description",
  //               "creation_datetime": null,
  //               "start_datetime": null,
  //               "end_datetime": null,
  //               "status": "Draft",
  //               "case": {
  //                 "id": "yy69843b-4939-6f37-96c7-c382c3e74b46",
  //                 "uri": "https://science-gate-way-middleware.azurewebstes.net/case/d769843b-6f37-4939-96c7-c382c3e74b46",
  //                 "thumbnail": "./src/assets/img/product_changeover.png",
  //                 "label": "Changeover",
  //                 "description": "Spicy jalapeno bacon ipsum dolor amet burgdoggen tenderloin cow ribeye kielbasa boudin. Kevin salami bacon venison landjaeger capicola frankfurter jerky ham hock hamburger tenderloin kielbasa rump porchetta. Tenderloin cow short loin, jowl brisket alcatra meatball burgdoggen doner ground round. Short ribs pancetta corned beef shankle, alcatra pastrami chicken biltong meatloaf t-bone ground round sausage bresaola ham. Drumstick chuck pork burgdoggen."
  //               }
  //             }
  //           }
  //           )));
  //       });

  //       jobService = getTestBed().get(ConfigDataService);
  //       expect(jobService).toBeDefined();

  //       jobService.getTemplateData().subscribe((components: any) => {
  //           // expect(components.length).toBeDefined();
  //           // expect(blogs.length).toEqual(1);
  //           // expect(blogs[0].id).toEqual(26);
  //           done();
  //       });
  //   });
  // });

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