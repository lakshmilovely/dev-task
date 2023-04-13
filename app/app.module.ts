import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import {HttpClientModule} from '@angular/common/http'
import { PopUpComponent } from './pop-up/pop-up.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthComponent } from './auth/auth.component';
import { ReportsComponent } from './reports/reports.component';





@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    PopUpComponent,
    AuthComponent,
    ReportsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule

  ],

  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
