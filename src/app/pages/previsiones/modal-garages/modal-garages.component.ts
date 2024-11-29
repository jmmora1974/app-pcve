import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IGarage } from 'src/app/models/igarage';
import { PrevisionesService } from 'src/app/services/previsiones.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modal-garages',
  templateUrl: './modal-garages.component.html',
  styleUrls: ['./modal-garages.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
})
export class ModalGaragesComponent implements OnInit {
  utilService = inject(UtilsService);
  previsionesService = inject(PrevisionesService);
  modelGarage: IGarage = {
    id: 0,
    numPlantas: 0,
    mtsGarage: 0,
    potGarage: 0,
    ventilacion: 0.01,
    tipoVentilacion: 'Natural',
    numPlazas:0,
    totalPotenciaGaragekW: 0,
  };

  resetGarage() {
    this.modelGarage = {
      id: 0,
      numPlantas: 0,
      mtsGarage: 0,
      potGarage: 0,
      ventilacion: 0.01,
      tipoVentilacion: 'Natural',
      numPlazas:0,
      totalPotenciaGaragekW: 0
    };
  }

  agregarGarage() {
    console.log('Garages ', this.modelGarage);

    this.calculaPotGarage();

    //Comprobamos que el número de ascensores y potencia es positivo.
    if (this.modelGarage.numPlantas < 1) {
      this.utilService.showAlert('Error num de plantas de garage', 'El número de plantas de garage ha de ser positivo.');

    } else if (this.modelGarage.mtsGarage < 0.1) {
      this.utilService.showAlert('Error superficie Garage.', 'La superficie del Garage ha de ser superior a 0.');

    } else {

      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;
      this.previsionesService.agregarGarage(this.modelGarage);
      this.resetGarage();
    }
  }

  //calcula automaticamente los inputs del form
  calculaPotGarage() {

    let venti = document.getElementById("ventNatural") as HTMLIonRadioElement;
    
    
     
    this.modelGarage.potGarage = this.modelGarage!.mtsGarage * this.modelGarage.ventilacion;


    this.modelGarage.totalPotenciaGaragekW = this.modelGarage.numPlantas * this.modelGarage.potGarage;

  }

  cambioVentilacion(ev: any) {
    console.log('ev',ev.value);
    if (ev.value == 0.01) {
      this.modelGarage.ventilacion = 0.01;
      this.modelGarage.tipoVentilacion = '10 W/m2 Natural';
    } else if (ev.value == 0.02) {
      this.modelGarage.ventilacion = 0.02;
      this.modelGarage.tipoVentilacion = '20 W/m2 Forzada';
    }else {
      console.log('error ventilacion no reconocida');
    }
    this.calculaPotGarage();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  constructor(private modalCtrl: ModalController) { this.resetGarage() }

  ngOnInit() { this.resetGarage(); }

}


