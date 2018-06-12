import {
    TestBed,
    getTestBed,
    async,
    inject,
    fakeAsync
  } from '@angular/core/testing';
  import {
    BaseRequestOptions,Response, XHRBackend, RequestMethod,ResponseOptions
  } from '@angular/http';
  import {
    HttpHeaders, HttpClientModule, HttpClient
  } from '@angular/common/http';

  import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
  
  import {MockBackend, MockConnection} from '@angular/http/testing';
  import {InputComponent} from '../components/input/inputComponent';
  import { CasesService } from './cases.service';
  import { Observable } from 'rxjs/Observable';
  
  describe('Cases Service', () => {
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

    it('should get cases', () => {
      let testUrl = "/case";
      let response = [
              {
                  "links": {
                      "self": "/case/3"
                  },
                  "name": "MyCase",
                  "id": 3
              }
            ]
      httpClient.get(testUrl)
        .subscribe(data =>
          // When observable resolves, result should match test data
          expect(data).toEqual(response)
        );

        // We set the expectations for the HttpClient mock
        // const req = httpMock.expectOne('http://.../case');
        const req = httpTestingController.expectOne(testUrl);
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush(response);
    });

  
    // it('should get cases', done => {
    //   let casesService: CasesService;
    //   getTestBed().compileComponents().then(() => {
    //     mockBackend.connections.subscribe(
    //       (connection: MockConnection) => {
    //         connection.mockRespond(new Response(
    //           new ResponseOptions({
    //             body: 
    //             [
    //                 {
    //                     "links": {
    //                         "self": "/case/3"
    //                     },
    //                     "name": "MyCase",
    //                     "id": 3
    //                 }
    //             ]
    //           })));
    //       });
  
    //       casesService = getTestBed().get(CasesService);
    //       expect(casesService).toBeDefined();
  
    //       casesService.getCases().subscribe((templates: any) => {
    //           expect(templates).toBeDefined();
    //           expect(templates[0].id).toBe(3)
    //           expect(templates[0].links.self).toBe("/case/3")
    //           done();
    //       });
    //   });
    // });
  });