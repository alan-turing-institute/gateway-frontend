import { Component } from '@angular/core';


import "../assets/css/font-awesome.min.css"
import "../assets/css/simple-line-icons.css"
import '../scss/style.scss'
import './layouts/layout.css'

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>',
    styleUrls: []
})
export class AppComponent { 
    constructor() {
    }
    title = 'Code Blue';
}
