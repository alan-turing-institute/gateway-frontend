import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { InputComponent } from './inputComponent';
import {Component, DebugElement} from "@angular/core";
// import {ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ComponentUnderTestSlider', () => {

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
        component.data = new InputComponent ("name", "type", "label", "units", "0", "10", "5", "help", "prefix");;
        inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
    });

    it('should show input with id values from @Input', () => {
        component.data = new InputComponent ("name", "type", "label", "units", "0", "10", "5", "help", "prefix");;
        expect(component.data.value).toBe("5")
        fixture.detectChanges();
        inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
        expect(inputDe.attributes.id).toBe("prefixname")
    });

    it('should show input value change', () => {
        expect(component.data.value).toBe("5")
        component.data.value = "7";
        fixture.detectChanges();
        inputDe = fixture.debugElement.query(By.css("div > form > section > div > div > input"));
        expect(inputDe.attributes['ng-reflect-model']).toBe("7")
    });

    it('should show slider value change', () => {
        component.data.value = "8";
        fixture.detectChanges();
        sliderDe = fixture.debugElement.query(By.css("div > form > section > div > div > ion-range-slider"));
        expect(sliderDe.attributes['ng-reflect-from']).toBe("8")
    });
})