import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { OutputComponent } from './output.component';
import { OutputRoutingModule } from './output-routing.module';
import { OutputService } from './output.service';

// import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './chart/chart.component';

import { DescriptionModule } from '../components/description/description.module';
import { PipeModule } from '../components/pipe/pipe.module';
// import { ConfigModule } from '../config/config.module';
import { DashboardModule } from '../dashboard/dashboard.module'
import { VideoComponent } from './video/video.component';
import { DownloadComponent } from './download/download.component';

@NgModule({
  imports: [
    OutputRoutingModule,
    NgxChartsModule,
    FormsModule,
    CommonModule,
    DescriptionModule,
    PipeModule
  ],
  declarations: [
    OutputComponent,
    ChartComponent,
    VideoComponent,
    DownloadComponent,
  ],
  providers: [
    OutputService
  ]
})
export class OutputModule { }
