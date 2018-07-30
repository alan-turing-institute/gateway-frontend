import { NgModule } from '@angular/core';
import { ConfigRoutingModule } from './config-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { DescriptionModule } from '../components/description/description.module';
import { ConfigDataService } from './configData.service';
import { InputModule } from '../components/input/input.module';
import { PipeModule} from '../components/pipe/pipe.module';
import { ClarityModule } from 'clarity-angular';
import { FeedbackComponent } from '../components/feedback/feedback.component';

import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { PreviewComponent } from '../components/preview/preview.component';

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
    FeedbackComponent,
    FileUploadComponent,
    PreviewComponent
  ],
  providers: [
    ConfigDataService,
    AuthService,
    // OutputService
  ],
  exports: [
    // ConfigComponent,
    // CaseDescriptionComponent
    FileUploadComponent,
    PreviewComponent
  ],
  entryComponents: [
  //  FeedbackComponent
  ]
})

export class ConfigModule { }
