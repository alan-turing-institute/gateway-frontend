import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { FormsModule } from '@angular/forms';
import {SliderComponent} from './slider/slider.component';
import { InputComponent } from './inputComponent';
import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";

describe('ComponentUnderTestSlider', () => {
    @Component({
        selector: `host-component`,
        template: `<sliderInput></sliderInput>`
      })

    class TestHostComponent {
        @ViewChild(SliderComponent)
        public sliderComponent: SliderComponent;
        private data: any;

        setInput() {
            this.data = {"name":"testSlider", "type":"slider", "value":"5", "min_value": "0", "max_value":10}
          }
    }

    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SliderComponent, TestHostComponent],
        imports:[IonRangeSliderModule, FormsModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });

    it('should show slider', () => {
        testHostComponent.setInput();
        console.log("Slider component: "+testHostFixture.nativeElement.querySelector('sliderInput'))
        // testHostComponent.sliderComponent.data.value = '7';
        // testHostFixture.detectChanges();
        console.log(testHostFixture.nativeElement.querySelector('sliderInput').innerText);
        expect(testHostFixture.nativeElement.querySelector('sliderInput').innerText).toBe('5');
    });
})