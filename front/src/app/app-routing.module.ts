import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BoModule} from "./dashboard/bo.module";


const routes: Routes = [
  // {path: 'dashboard', loadChildren: () => import('./dashboard/bo.module').then(m => m.BoModule)},
  {path: 'dashboard', loadChildren: () => BoModule},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
