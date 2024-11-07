import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalServGeneralesPageRoutingModule } from './modal-serv-generales-routing.module';

import { ModalServGeneralesPage } from './modal-serv-generales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalServGeneralesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalServGeneralesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class ModalServGeneralesPageModule {}
