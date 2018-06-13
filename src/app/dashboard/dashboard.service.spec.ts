import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('dashboard get jobs', () => {
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
    let response = [ {
                        "name": "TESTMINT",
                        "user": "nbarlow",
                        "status": "Not Started",
                        "links": {
                            "self": "/job/1",
                            "case": "/case/3"
                        },
                        "id": 1
                      }]

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
