import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';
import { SimulationsCreateComponent } from './create/create.component';
import { SimulationsViewComponent } from './view/view.component';

import { SimulationsService } from './simulations.service';
import { SimulationsConfigureComponent } from './configure/configure.component';

// import { reducers } from './reducers';

const COMPONENTS = [
  SimulationsCreateComponent,
  SimulationsViewComponent,
  SimulationsConfigureComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    // StoreModule.forFeature('books', reducers)
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SimulationsModule { }
