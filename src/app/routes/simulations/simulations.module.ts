import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';
import { SimulationsCreateComponent } from './create/create.component';
import { SimulationsViewComponent } from './view/view.component';

import { SimulationsService } from './simulations.service';
import { SimulationsConfigureComponent } from './configure/configure.component';

const COMPONENTS = [
  SimulationsCreateComponent,
  SimulationsViewComponent,
  SimulationsConfigureComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SimulationsModule { }
