import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InputComponent } from '../inputComponent';

/**
 * The slider is a component to allow users to select numeric
 * values within a specified range.
 */
@Component({
  selector: 'sliderInput',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.css']
})
export class SliderComponent implements OnInit {
  @Input() data: InputComponent;
  @Output() onUpdated = new EventEmitter<string>();
  private defaultValue: string;

  public ngOnInit() {
    if (!this.valueValidated(this.data.value)) {
      this.data.value = this.data.min_value;
    }
    this.defaultValue = this.data.value;
  }

  /**
   * Handle the slider being updated by dragging the slider
   *
   * @param event The slider move event.
   */
  public updateSlider(event: {from: number}) {
    this.updateValue(event.from.toString());
  }

  /**
   * Handle the slider value being entered directly into the text
   * field.
   *
   * @param value The new value set of the slider
   */
  public updateText(value: string) {
    this.updateValue(value);
  }

  /**
   * Set the slider to a new specified value.
   * If this value is not supported by the slider, then set
   * the slider to it's default.
   *
   * @param newValue The new value to attempt to assign to the slider
   */
  private updateValue(newValue: string) {
    if (!this.valueValidated(newValue)) {
      newValue = this.defaultValue;
    }
    this.data.value = newValue;
    this.onUpdated.emit(this.data.value);
  }

  /**
   * Ensure that the value being passed in is a valid number.
   *
   * @param newValue The new value that the slider should be set to
   * @returns True if the new value is within the slider range. Otherwise false.
   */
  private valueValidated(newValue: string): boolean {
    if (newValue &&
        Number(newValue) !== NaN &&
        Number(this.data.value) >= Number(this.data.min_value) &&
        Number(this.data.value) <= Number(this.data.max_value)) {
      console.log(newValue + ' is valid');
      return true;
    } else {
      console.log(newValue + ' is invalid');
      return false;
    }
  }
}
