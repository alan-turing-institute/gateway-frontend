import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { TextComponent } from './text/text.component';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SliderComponent,
    IonRangeSliderComponent,
    TextComponent
  ],
  exports : [SliderComponent, TextComponent]
})
export class InputModule { }
