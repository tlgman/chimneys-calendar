import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BoModule} from '../dashboard/bo.module';
import {TakeRdvComponent} from './pages/take-rdv/take-rdv.component';


const routes: Routes = [
  // {path: 'dashboard', loadChildren: () => import('./dashboard/bo.module').then(m => m.BoModule)},
  {path: 'dashboard', loadChildren: () => BoModule},
  {path: 'rendez-vous', component: TakeRdvComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
