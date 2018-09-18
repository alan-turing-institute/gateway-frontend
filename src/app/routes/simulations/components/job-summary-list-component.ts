import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

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
export class JobSummaryListComponent {
  constructor(private router: Router, public msg: NzMessageService) {}

  @Input()
  jobSummaries: JobSummary[];
  @Input()
  loading: boolean;
  @Output()
  view: EventEmitter<string> = new EventEmitter();
  @Output()
  configure: EventEmitter<string> = new EventEmitter();

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  displayData = this.jobSummaries;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jobSummaries']) {
      this.displayData = this.jobSummaries;
    }
  }

  private sortName = null;
  private sortValue = null;

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
  onView(id: string) {
    this.view.emit(id);
  }

  onConfigure(id: string) {
    this.configure.emit(id);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
}
