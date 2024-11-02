import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalIrvePage } from './modal-irve.page';

const routes: Routes = [
  {
    path: '',
    component: ModalIrvePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalIrvePageRoutingModule {}
