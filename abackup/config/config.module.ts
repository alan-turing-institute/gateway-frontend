import { NgModule } from '@angular/core';
import { ConfigRoutingModule } from './config-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ConfigComponent } from './config.component';
import { ConfigDataService } from './configData.service';
import { OutputService } from '../output/output.service';
import { PipeModule} from '../pipe.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from  './config.component';

// import { ParametersComponent} from './parameters.component';
// import { DescriptionComponent} from './description.component';

@NgModule({
  imports: [
    ConfigRoutingModule,
    CommonModule,
    FormsModule,
    IonRangeSliderModule,
    PipeModule,
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    ConfigComponent,
    ModalContentComponent
  ],
  providers: [
    ConfigDataService,
    OutputService],
  exports: [
    ConfigComponent
  ],
  entryComponents: [
   ModalContentComponent
  ]
})

export class ConfigModule { }
