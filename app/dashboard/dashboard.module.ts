import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../header/header.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
 import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
     OwlDateTimeModule, OwlNativeDateTimeModule,

  ]
})
export class DashboardModule { }
