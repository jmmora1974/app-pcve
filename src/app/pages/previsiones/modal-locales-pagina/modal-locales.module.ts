import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLocalesPageRoutingModule } from './modal-locales-routing.module';

import { ModalLocalesPage } from './modal-locales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLocalesPageRoutingModule
  ],
  declarations: [ModalLocalesPage]
})
export class ModalLocalesPageModule {}
