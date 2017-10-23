import { Component } from '@angular/core';
// import {} from "clarity-icons/"

// import "../assets/css/font-awesome.min.css"
// import "../assets/css/simple-line-icons.css"
// import '../scss/style.scss'
import "../../node_modules/clarity-icons/clarity-icons.min.css"
import "../../node_modules/@webcomponents/custom-elements/custom-elements.min.js"
import "../../node_modules/clarity-icons/clarity-icons.min.js"
import './layout/main.css'

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>',
    //styleUrls: []
    // styles:[require('../../../node_modules/clarity-ui/clarity-ui.min.css').toString()]
})
export class AppComponent {
    constructor() {
    }
    title = 'Code Blue';
}
