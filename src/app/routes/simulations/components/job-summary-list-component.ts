import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { JobSummary } from '../models/job';

@Component({
  selector: 'sim-job-summary-list',
  templateUrl: 'job-summary-list.component.html',
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class JobSummaryListComponent implements OnChanges {
  private sortName = null;
  private sortValue = null;
  constructor(private router: Router) {}

  @Input()
  jobSummaries: JobSummary[];
  @Input()
  loading: boolean;
  @Output()
  select: EventEmitter<string> = new EventEmitter();
  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  displayData = this.jobSummaries;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jobSummaries']) {
      this.displayData = this.jobSummaries;
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    // bypass any filtering
    const filterFunc = item => true;
    const data = this.jobSummaries.filter(item => filterFunc(item));
    if (this.sortName) {
      this.displayData = data.sort(
        (a, b) =>
          this.sortValue === 'ascend'
            ? a[this.sortName] > b[this.sortName]
              ? 1
              : -1
            : b[this.sortName] > a[this.sortName]
              ? 1
              : -1,
      );
    } else {
      this.displayData = data;
    }
  }

  // let parent page component handle any required navigation
  onSelect(id: string) {
    this.select.emit(id);
  }

  onCancel() {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
