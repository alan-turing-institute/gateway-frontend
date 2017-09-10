import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OutputComponent } from './output.component';
import { OutputRoutingModule } from './output-routing.module';
import { OutputService } from './output.service';
import { PipeModule} from '../pipe.module';


import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsComponent } from './chart';
import { ConfigModule } from '../config/config.module';
import { DashboardModule } from '../dashboard/dashboard.module'

import { VideoComponent } from './video/video.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    OutputRoutingModule,
    ChartsModule,
    FormsModule,
    IonRangeSliderModule,
    CommonModule,
    PipeModule,
    ConfigModule,
    DashboardModule,
    NgxChartsModule,
    TabsModule.forRoot()
  ],
  declarations: [
    OutputComponent,
    ChartsComponent,
    VideoComponent
  ],
  providers: [
    OutputService
  ]
})
export class OutputModule { }
