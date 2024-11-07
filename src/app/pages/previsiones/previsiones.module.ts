import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
>>>>>>> a6f1fb9 ( Changes to be committed:)

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
<<<<<<< HEAD
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    
    
=======
    ReactiveFormsModule
>>>>>>> a6f1fb9 ( Changes to be committed:)
  ],
  declarations: [PrevisionesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class PrevisionesPageModule {}
