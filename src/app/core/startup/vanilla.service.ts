import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class RawHttpClient extends HttpClient {
    constructor(handler: HttpBackend) {
        super(handler);
    }
}
