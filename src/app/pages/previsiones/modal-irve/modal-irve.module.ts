import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalIrvePageRoutingModule } from './modal-irve-routing.module';

import { ModalIrvePage } from './modal-irve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalIrvePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalIrvePage]
})
export class ModalIrvePageModule {}
