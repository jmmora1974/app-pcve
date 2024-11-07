import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalServGeneralesPageRoutingModule } from './modal-serv-generales-routing.module';

import { ModalServGeneralesPage } from './modal-serv-generales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalServGeneralesPageRoutingModule
  ],
  declarations: [ModalServGeneralesPage]
})
export class ModalServGeneralesPageModule {}
