import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderComponent} from './slider.component';
import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";

describe('ComponentUnderTestSlider', () => {
    @Component({
        selector: `host-component`,
        template: `<slider-component></slider-component>`
      })
    class TestHostComponent {
        @ViewChild(SliderComponent)
        public sliderComponent: SliderComponent;
    }

    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SliderComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });

    // it('should show slider', () => {
    //     expect(1).toEqual(1);
        
    // });
})