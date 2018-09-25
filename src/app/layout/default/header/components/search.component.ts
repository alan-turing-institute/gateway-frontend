import {
  Component,
  HostBinding,
  ViewChild,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';

import { SimulationService } from '@simulations/services/simulation.service';
import { JobSummary } from '@simulations/models/job';

@Component({
  selector: 'header-search',
  templateUrl: './search.component.html',
})
export class HeaderSearchComponent implements AfterViewInit, OnInit {
  q: string;
  qInput: HTMLInputElement;
  private search$: Subject<string> = new Subject();
  private searchResults: JobSummary[];

  @HostBinding('class.header-search__focus')
  focus = false;

  @HostBinding('class.header-search__toggled')
  searchToggled = false;

  optionGroups: any[];

  @Input()
  set toggleChange(value: boolean) {
    if (typeof value === 'undefined') return;
    this.searchToggled = true;
    this.focus = true;
    setTimeout(() => this.qInput.focus(), 300);
  }

  constructor(
    private el: ElementRef,
    private simulationService: SimulationService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.qInput = (this.el.nativeElement as HTMLElement).querySelector(
      '.ant-input',
    ) as HTMLInputElement;
  }

  onSearch(value: string) {
    this.search$.next(value);
  }

  onSelect(name: string) {
    // find job id given job name.
    // search bar text may be incomplete when first option is highlighted
    // i.e. user has not used up/down arrows to move beyond the first highlighted option

    let summary: JobSummary = this.searchResults.find(job => job.name === name);
    let id;
    if (summary) {
      // Use complete match
      id = summary.id;
    } else if (this.searchResults.length) {
      // Fall back to first search result
      summary = this.searchResults[0];
      id = summary.id;
    }
    if (id) {
      this.router.navigate(['/simulations', id]);
    }
  }

  qFocus() {
    this.focus = true;
  }

  qBlur() {
    this.focus = false;
    this.searchToggled = false;
  }

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(300),
        switchMap(value =>
          this.simulationService.searchJobSummaries(value, false),
        ),
      )
      .subscribe(res => {
        this.searchResults = res;
      });
  }
}
