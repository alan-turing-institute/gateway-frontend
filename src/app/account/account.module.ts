import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

import { AccountService } from './account.service';
 import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AccountRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    AccountService
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
