import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevisionesPage } from './previsiones.page';

const routes: Routes = [
  {
    path: '',
    component: PrevisionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevisionesPageRoutingModule {}
