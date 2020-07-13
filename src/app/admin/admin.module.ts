import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AdminAuthGuardService,
  ],
})
export class AdminModule { }
