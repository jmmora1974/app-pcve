import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLocalesPage } from './modal-locales.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLocalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLocalesPageRoutingModule {}
