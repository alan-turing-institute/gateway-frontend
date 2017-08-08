import { Component } from '@angular/core';


import "../assets/css/font-awesome.min.css"
import "../assets/css/simple-line-icons.css"
import '../scss/style.scss'

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent { 
    constructor() {
    }
    title = 'Code Blue';
}
