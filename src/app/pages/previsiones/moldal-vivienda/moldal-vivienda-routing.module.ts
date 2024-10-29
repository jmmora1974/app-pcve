import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoldalViviendaPage } from './moldal-vivienda.page';

const routes: Routes = [
  {
    path: '',
    component: MoldalViviendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoldalViviendaPageRoutingModule {}
