import { Component, OnInit, inject } from '@angular/core';
import { ILocal } from 'src/app/models/ilocal';
import { PrevisionesService } from 'src/app/services/previsiones.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modal-locales',
  templateUrl: './modal-locales.page.html',
  styleUrls: ['./modal-locales.page.scss'],
})
export class ModalLocalesPage implements OnInit {
  utilService = inject(UtilsService);
  previsionesService = inject(PrevisionesService);
  modelLocal: ILocal ={
    id: 0,
    numLocales: 0,
    mtsLocal: 0,
    potLocal: 0,
    totalPotenciaLocalkW: 0 
  };
  calcular(){
    console.log('en calcular')
  }
  resetLocal() { 
    this.modelLocal={
      id: 0,
      numLocales: 0,
      mtsLocal: 0,
      potLocal: 0,
      totalPotenciaLocalkW: 0
    };
  }
  
  agregarLocales(){
    console.log('locales ', this.modelLocal);
    this.calculaPotLocal();
  }
  
  calculaPotLocal(){
    if (this.modelLocal!.mtsLocal<34.5) {
        this.modelLocal!.potLocal=3.45;
    }else {
      this.modelLocal.potLocal=this.modelLocal!.mtsLocal*0.1;
    }
    
    this.modelLocal.totalPotenciaLocalkW=this.modelLocal.numLocales*this.modelLocal.potLocal;

  }
  constructor() { this.resetLocal()}

  ngOnInit() {
  }

}
