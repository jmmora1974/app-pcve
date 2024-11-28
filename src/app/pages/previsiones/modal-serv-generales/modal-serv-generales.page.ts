

import { Component, signal, OnInit, WritableSignal, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSelect, ModalController } from '@ionic/angular';
import { IAlumbrado } from 'src/app/models/ialumbrado';


import { IAscensor } from 'src/app/models/iascensor';
import { IGMotor } from 'src/app/models/igmotor';
import { PrevisionesService } from 'src/app/services/previsiones.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-modal-serv-generales',
  templateUrl: './modal-serv-generales.page.html',
  styleUrls: ['./modal-serv-generales.page.scss'],
})
export class ModalServGeneralesPage implements OnInit {
  submitted = true;
  public tipoPotAscensor: string[] = ['ITA-1', 'ITA-2', 'ITA-3', 'ITA-4', 'ITA-5', 'ITA-6', 'OTRO'];
  public medidorPotencia: string[] = ['kW', 'W', 'cV'];
  public potenciasAlumbradoPortal = [{
    nombreAlum: "15W/m2 Incandescia Portal y comunes",
    potAlum: 0.015
  },
  {
    nombreAlum: "8W/m2 FLuorescencia Portal y comunes",
    potAlum: 0.008
  },
  {
    nombreAlum: "7W/m2 Incandescencia Caja Escalera",
    potAlum: 0.007
  },
  {
    nombreAlum: "4W/m2 FLuorescencia Caja Escalera",
    potAlum: 0.004



  }];

  formAscensor!: FormGroup;
  modelAscensor!: IAscensor;
  modelGMotor!: IGMotor;
  modelAlumbrado!: IAlumbrado;
 
  medPotMotorGM: string = 'kW';

  //@Input()  numAsc:any;

  //Injectamos el servicio de alertas
  utilService = inject(UtilsService);

  //Injectamos el servicio de previsiones para los calculos
  previsionesService = inject(PrevisionesService);

  constructor(private fbAsc: FormBuilder, private modalCtrl: ModalController,) {
    this.resetAscensor();
    this.resetGrupoMotor();
    this.resetAlumbrado();

    
    this.formAscensor = this.fbAsc.group({
      id: new FormControl(0, Validators.required),
      numAscensores: new FormControl(0, Validators.required),
      tipoMotorAsc: new FormControl('ITA-1', Validators.required),
      potenciaMotorAsc: new FormControl(0, Validators.required),
      selMedPotAsc: new FormControl(0, Validators.required),
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
   this.resetAscensor();
  }

  /*Funcion para agregar ascensores a la previsión de servicios generales*/
  agregarAscensor() {
    //Comprobamos que el número de ascensores y potencia es positivo.
    if (this.modelAscensor.numAscensores < 1) {
      this.utilService.showAlert('Error num ascensor', 'El número de ascensores ha de ser positivo.')

    } else if (this.modelAscensor.potenciaMotorAsc < 0.1) {
      this.utilService.showAlert('Error potencia ascensor.', 'La potencia del ascensores ha de ser superior a 0.1.')

    } else {
      this.submitted = true;
      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;

      this.previsionesService.agregraAscensor(this.modelAscensor);
      this.resetAscensor();
    }


  }

  cambiaPotAscensor(tipoMotor: any) {
    console.log('selmedpotasc', tipoMotor.value);
    const potAsc = document.getElementById("potAsc");
    document.getElementById("medPotMotorAsc")?.setAttribute("disabled", "true");
    potAsc?.contentEditable;
    potAsc?.setAttribute('readonly', 'true');
    document.getElementById("medPotMotorAsc")?.setAttribute('value', 'kW');
    switch (tipoMotor.value) {
      case "ITA-1":
        this.modelAscensor.potenciaMotorAsc = 4.5;
        return "4.5";
      case "ITA-2":
        this.modelAscensor.potenciaMotorAsc = 7.5;
        return "7.5";
      case "ITA-3":
        this.modelAscensor.potenciaMotorAsc = 11.5;
        return "11.5";
      case "ITA-4":
        this.modelAscensor.potenciaMotorAsc = 18.5;
        return "18.5";
      case "ITA-5":
        this.modelAscensor.potenciaMotorAsc = 29.5;
        return "29.5";
      case "ITA-6":
        this.modelAscensor.potenciaMotorAsc = 46;
        return "46";
      default:
        this.modelAscensor.potenciaMotorAsc = 0;
        potAsc?.removeAttribute('readonly');
        document.getElementById("medPotMotorAsc")?.setAttribute("disabled", "false");
        return "0";
    }

  }


  agregarGrupoMotor() {

    //Comprobamos que el número de ascensores y potencia es positivo.
    if (this.modelGMotor.numGMotores < 1) {
      this.utilService.showAlert('Error num de motores', 'El número de motores ha de ser positivo.')

    } else if (this.modelGMotor.potenciaGMotor < 0.1) {
      this.utilService.showAlert('Error potencia motor.', 'La potencia del motor ha de ser superior a 0.1.')

    } else {
      this.submitted = true;
      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;
      this.previsionesService.agregarGrupoMotor(this.modelGMotor);
      this.resetGrupoMotor();
    }
    

  }
  cambiaPotGMotor(elemen: any) {
    console.log('selmedpotGMOotor', JSON.stringify(elemen.value));

  }
  //Funcion encargada de agregar alumbrado
  agregarAlumbrado() {
    this.modelAlumbrado.totalPotenciaAlumkW = 0;
    //this.modelAlumbrado.tipoAlumbrado!
   
    if (this.modelAlumbrado.mtsAlumbrado! < 1 && this.modelAlumbrado.numLamparas! < 1) {
      this.utilService.showAlert('Error datos no introducidos.', 'Ha de introducir un valor en mts  alumbrado o número de lámparas.')

    } else {
      if (this.modelAlumbrado.numLamparas! > 0 && this.modelAlumbrado.potLamparas==0) {
        this.utilService.showAlert('Error datos no introducidos.', 'Debe indicar la potencia de las lamparas.')
  
      }else{
        this.submitted = true;
        this.previsionesService.agregarAlumbrado(this.modelAlumbrado);}
        this.resetAlumbrado();
      }
     
    }

  


//Funciones  para poner valores por defecto de los formularios
  resetAscensor(){
    this.modelAscensor = {
      id: 0,
      numAscensores: 0,
      tipoMotorAsc: 'ITA-1',
      potenciaMotorAsc: 4.5,
      medidaPotencia: 'kW',
      totalpotenciakw: 0
    };

  }
  resetGrupoMotor(){
    this.modelGMotor = {
      id: 0,
      numGMotores: 0,
      potenciaGMotor: 0,
      medidaPotencia: 'kW',
      totalpotenciakw: 0
    };
  }
  resetAlumbrado() {
    this.modelAlumbrado = {
      id: 0,
      mtsAlumbrado: 0,
      tipoAlumbrado: { nombreAlum: '15W/m2 Incandescia Portal y comunes', potAlum: 0.015, },
      numLamparas: 0,
      potLamparas: 0,
      medidaPotencia:'W',
      lampFluorescente:false,
      totalPotenciaAlumkW: 0
    }
    

  }

  cambiaPotAlumPortal(ev: any) {

  }
}
