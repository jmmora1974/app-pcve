import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoldalViviendaPageRoutingModule } from './moldal-vivienda-routing.module';

import { MoldalViviendaPage } from './moldal-vivienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoldalViviendaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MoldalViviendaPage]
})
export class MoldalViviendaPageModule {}
