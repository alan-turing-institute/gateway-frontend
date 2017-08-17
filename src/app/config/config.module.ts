import { NgModule } from '@angular/core';
import { ConfigRoutingModule } from './config-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ConfigComponent } from './config.component';
import { DescriptionComponent } from './description.component'
import { ConfigDataService } from './configData.service';
import { VtkModule} from '../vtk.module';
// import { ParametersComponent} from './parameters.component';
// import { DescriptionComponent} from './description.component';

@NgModule({
  imports: [
    ConfigRoutingModule,
    CommonModule,
    FormsModule,
    IonRangeSliderModule,
    VtkModule
  ],
  declarations: [ConfigComponent,
                  DescriptionComponent],
  providers: [ConfigDataService],
  exports: [ConfigComponent, DescriptionComponent]
})

export class ConfigModule { }
