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
      "id": 1,
      "name": "TESTMINT",
      "description": "sasa",
      "status": "Not Started",
      "links": {
          "self": "/job/1",
          "case": "/case/3"
      },
      "parent_case": {
          "id": 3,
          "name": "MyCase",
          "description": null,
          "links": {
              "self": "/case/3"
          },
          "thumbnail": null
      },
      "user": "testuser"
  }]

    httpClient.get(testUrl)
      .subscribe(data =>     
        expect(data).toEqual(response)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    expect(response.length).toBe(1);
    expect(response[0].parent_case).toBeDefined();
    expect(response[0].description.length).toBeGreaterThan(0);

    req.flush(response);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
