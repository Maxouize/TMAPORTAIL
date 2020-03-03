import { ManagerViewComponent } from './view/manager-view/manager-view.component';
import { DevViewComponent } from './view/dev-view/dev-view.component';
import { ClientViewComponent } from './view/client-view/client-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  { path: 'home', component: HomeComponent},
  { path: 'client-view', component: ClientViewComponent},
  { path: 'dev-view', component: DevViewComponent},
  { path: 'manager-view', component: ManagerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
