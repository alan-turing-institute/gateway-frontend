import { NgModule } from '@angular/core';
import { ConfigRoutingModule } from './config-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ConfigComponent } from './config.component';
import { DescriptionModule } from '../components/description/description.module';
import { ConfigDataService } from './configData.service';
import { InputModule } from '../components/input/input.module';
import { PipeModule} from '../components/pipe/pipe.module';
import { ClarityModule } from "clarity-angular";
// import { TabsModule } from 'ngx-bootstrap/tabs';

// import { ModalModule } from 'ngx-bootstrap/modal';
import { FeedbackComponent } from '../components/feedback/feedback.component';

// import { ParametersComponent} from './parameters.component';
// import { DescriptionComponent} from './description.component';

import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    ConfigRoutingModule,
    CommonModule,
    FormsModule,
    // IonRangeSliderModule,
    PipeModule,
    InputModule,
    DescriptionModule,
    ClarityModule.forRoot(),
    // TabsModule.forRoot(),
    // ModalModule.forRoot()
  ],
  declarations: [
    ConfigComponent,
    // TextInputComponent,
    // SliderInputComponent,
    FeedbackComponent
  ],
  providers: [
    ConfigDataService,
    AuthService,
    // OutputService
  ],
  exports: [
    // ConfigComponent,
    // CaseDescriptionComponent
  ],
  entryComponents: [
  //  FeedbackComponent
  ]
})

export class ConfigModule { }
