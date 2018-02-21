import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { InputComponent } from './inputComponent';
import {Component, DebugElement} from "@angular/core";
// import {ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ComponentUnderTestSlider', () => {
    // @Component({
    //     selector: `host-component`,
    //     template: `<sliderInput></sliderInput>`
    //   })

    // class TestHostComponent {
    //     @ViewChild(SliderComponent)
    //     public sliderComponent: SliderComponent;
    //     // private data: any;

    //     // setInput() {
    //     //     this.data = {"name":"testSlider", "type":"slider", "value":"5", "min_value": "0", "max_value":10}
    //     //   }
    // }

    let component: SliderComponent;
    let fixture: ComponentFixture<SliderComponent>;
    let inputDe:DebugElement;
    let sliderDe:DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SliderComponent],
        imports:[IonRangeSliderModule, FormsModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderComponent);
        component = fixture.componentInstance;
        // sliderDe = fixture.debugElement.query(By.css("div > form > section > div > div > ion-range-slider"));
        // inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
        // sliderEl = fixture.debugElement.query(By.css("div form section div div ion-range-slider"));
    });

    it('should show input', () => {
        component.data = new InputComponent ("name", "type", "label", "units", "0", "10", "5", "help", "prefix");;
        expect(component.data.value).toBe("5")
        component.data.value = "7";
        fixture.detectChanges();
        inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
        expect(inputDe).toBeDefined();
        expect(inputDe.attributes.id).toBe("prefixname")
        console.log(inputDe.attributes);
        // console.log(inputDe.nativeElement.max_value);
    });

    // it('should show slider', () => {
    //     // testHostComponent.setInput();
    //     component.data = new InputComponent ("name", "type", "label", "units", "0", "10", "5", "help", "prefix");;
    //     // console.log(component.data)
    //     expect(component.data.value).toBe("5")
    //     component.data.value = "7";
    //     fixture.detectChanges();
        
    //     inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
    //     sliderDe = fixture.debugElement.query(By.css("div > form > section > div > div > ion-range-slider"));
    //     // console.log(sliderDe);
    //     // console.log(inputDe);
    //     console.log(inputDe.nativeElement);
        
    // });
})