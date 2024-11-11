import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevisionesPageRoutingModule } from './previsiones-routing.module';

import { PrevisionesPage } from './previsiones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevisionesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PrevisionesPage]
})
export class PrevisionesPageModule {}
