import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '.dropdown'
})
export class DropdownDirective {

  constructor(private el: ElementRef) { }

  toggle() {
    this.el.nativeElement.classList.toggle('open');
  }
}

/**
* Allows the dropdown to be toggled via click.
*/
@Directive({
  selector: '.dropdown-toggle',
})
export class DropdownToggleDirective {
  constructor(private dropdown: DropdownDirective) {}

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    this.dropdown.toggle();
  }
}

export const DROPDOWN_DIRECTIVES = [DropdownDirective, DropdownToggleDirective];
// export const NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];
