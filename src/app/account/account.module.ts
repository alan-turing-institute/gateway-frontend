import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';


// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    AccountRoutingModule,
    // ChartsModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
