import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';
import { SimulationsCreateComponent } from './components/create.component';
import { SimulationsViewComponent } from './components/view.component';
import { SimulationsConfigureComponent } from './components/configure.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CaseEffects } from './effects/case.effects';
// import { CollectionEffects } from './effects/collection.effects';
// import { BookExistsGuard } from './guards/book-exists.guard';

import { reducers } from './reducers';

const COMPONENTS = [
  SimulationsCreateComponent,
  SimulationsViewComponent,
  SimulationsConfigureComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    StoreModule.forFeature('cases', reducers),
    // EffectsModule.forFeature([CaseEffects, CollectionEffects]),
    EffectsModule.forFeature([CaseEffects]),
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SimulationsModule { }
