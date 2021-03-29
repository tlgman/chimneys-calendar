import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BoModule} from '../bo/bo.module';
import {TakeRdvComponent} from './pages/take-rdv/take-rdv.component';
import {ContainerComponent} from './pages/container/container.component';


const routes: Routes = [
  // {path: 'dashboard', loadChildren: () => import('./dashboard/bo.module').then(m => m.BoModule)},
  {path: '', component: ContainerComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'rendez-vous', component: TakeRdvComponent},
  ]},
  {path: 'dashboard', loadChildren: () => BoModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
