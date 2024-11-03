import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalServGeneralesPage } from './modal-serv-generales.page';

const routes: Routes = [
  {
    path: '',
    component: ModalServGeneralesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalServGeneralesPageRoutingModule {}
