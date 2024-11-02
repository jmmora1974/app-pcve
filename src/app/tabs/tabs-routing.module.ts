import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'previsiones',
        loadChildren: () => import('../pages/previsiones/previsiones.module').then(m => m.PrevisionesPageModule)
      },
      {
        path: 'secciones',
        loadChildren: () => import('../pages/secciones/secciones.module').then( m => m.SeccionesPageModule)
      },
      {
        path: 'creditos',
        loadChildren: () => import('../pages/creditos/creditos.module').then( m => m.CreditosPageModule)
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/previsiones',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
