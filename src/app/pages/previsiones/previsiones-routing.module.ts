import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevisionesPage } from './previsiones.page';

const routes: Routes = [
  {
    path: '',
    component: PrevisionesPage
  },  {
    path: 'moldal-vivienda',
    loadChildren: () => import('./moldal-vivienda/moldal-vivienda.module').then( m => m.MoldalViviendaPageModule)
  },
  {
    path: 'modal-irve',
    loadChildren: () => import('./modal-irve/modal-irve.module').then( m => m.ModalIrvePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevisionesPageRoutingModule {}
