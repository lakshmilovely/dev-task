import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ReportsComponent } from './reports/reports.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path: 'dashBoard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'header', loadChildren: () => import('./header/header.module').then(m => m.HeaderModule) },
{path:'pop',component:PopUpComponent},
{path:'auth/:token',component:AuthComponent},
{path:'reports',component:ReportsComponent},
{path:'auth',component:AuthComponent},
//{path:'tasks',component:TasksComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
