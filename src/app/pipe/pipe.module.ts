import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeComponent } from '../three/pipe/pipe.component';
import { TankComponent } from '../three/tank/tank.component';
import { InterfaceComponent } from '../three/interface/interface.component';

// import { CasesModule } from './cases/cases.module';
// import { OutputModule } from './output/output.module';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PipeComponent,
    TankComponent,
    InterfaceComponent
  ],
  exports : [PipeComponent, TankComponent, InterfaceComponent]
})
export class PipeModule { }
