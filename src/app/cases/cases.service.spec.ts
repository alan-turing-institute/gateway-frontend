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
  import { CasesService } from './cases.service';
  
  describe('Cases Service', () => {
    let mockBackend: MockBackend;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
            CasesService,
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
  
    it('should get cases', done => {
      let casesService: CasesService;
      getTestBed().compileComponents().then(() => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: 
                [
                    {
                        "links": {
                            "self": "/case/3"
                        },
                        "name": "MyCase",
                        "id": 3
                    }
                ]
              })));
          });
  
          casesService = getTestBed().get(CasesService);
          expect(casesService).toBeDefined();
  
          casesService.getCases().subscribe((templates: any) => {
              expect(templates).toBeDefined();
              expect(templates[0].id).toBe("3")
              expect(templates[0].links.self).toBe("/case/3")
              done();
          });
      });
    });
  });