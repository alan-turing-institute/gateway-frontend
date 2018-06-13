import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
        expect(data).toEqual(response)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    expect(response.length).toBe(1);
    expect(response[0].id).toBe(3);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});