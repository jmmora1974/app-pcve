import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeccionesPage } from './secciones.page';

const routes: Routes = [
  {
    path: '',
    component: SeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionesPageRoutingModule {}
