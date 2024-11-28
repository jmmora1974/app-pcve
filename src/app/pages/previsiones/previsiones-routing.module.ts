import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevisionesPage } from './previsiones.page';

const routes: Routes = [
  {
    path: '',
    component: PrevisionesPage
  },
  {
    path: 'moldal-vivienda',
    loadChildren: () => import('./moldal-vivienda/moldal-vivienda.module').then( m => m.MoldalViviendaPageModule)
  },
  {
    path: 'modal-serv-generales',
    loadChildren: () => import('./modal-serv-generales/modal-serv-generales.module').then( m => m.ModalServGeneralesPageModule)
  },
  {
    path: 'modal-locales',
    loadChildren: () => import('./modal-locales-pagina/modal-locales.module').then( m => m.ModalLocalesPageModule)
  },
  {
    path: 'modal-locales',
    loadChildren: () => import('./pages/previsiones/modal-locales/modal-locales.module').then( m => m.ModalLocalesPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevisionesPageRoutingModule {}
