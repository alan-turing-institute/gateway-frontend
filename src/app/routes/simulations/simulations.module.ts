import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';
import { SimulationsCreateComponent } from './create/create.component';
import { SimulationsViewComponent } from './view/view.component';

const COMPONENTS = [
  SimulationsCreateComponent,
  SimulationsViewComponent];
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
