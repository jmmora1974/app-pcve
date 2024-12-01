import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PrevisionesPageRoutingModule } from './previsiones-routing.module';
import {MatTableModule} from '@angular/material/table';
import { PrevisionesPage } from './previsiones.page';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevisionesPageRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    
    
  ],
  declarations: [PrevisionesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class PrevisionesPageModule {}
