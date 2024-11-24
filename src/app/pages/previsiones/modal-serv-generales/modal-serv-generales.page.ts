

import { Component, signal, OnInit, WritableSignal, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';


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
  submitted = false;
  public tipoPotAscensor: string[] = ['ITA-1', 'ITA-2', 'ITA-3', 'ITA-4', 'ITA-5', 'ITA-6', 'OTRO'];
  public medidorPotencia: string[] = ['kW', 'W', 'cV'];
  formAscensor!: FormGroup;
  modelAscensor!: IAscensor;
  modelGMotor!: IGMotor;

  medPotMotorGM: string = 'kW';
  
  //@Input()  numAsc:any;

  //Injectamos el servicio de alertas
  utilService = inject(UtilsService);

  //Injectamos el servicio de previsiones para los calculos
  previsionesService=inject(PrevisionesService);

  constructor(private fbAsc: FormBuilder) {
    

    this.modelGMotor = {
      id: 0,
      numGMotores: 3,
      potenciaGMotor: 2,
      medidaPotencia: 'kW',
      totalpotenciakw: 0
    };

    this.formAscensor = this.fbAsc.group({
      id: new FormControl(0, Validators.required),
      numAscensores: new FormControl(0, Validators.required),
      tipoMotorAsc: new FormControl('ITA-1', Validators.required),
      potenciaMotorAsc: new FormControl(0, Validators.required),
      selMedPotAsc: new FormControl(0, Validators.required),
    });
  }

  ngOnInit() {
    this.modelAscensor = {
      id: 0,
      numAscensores: 0,
      tipoMotorAsc: 'ITA-1',
      potenciaMotorAsc: 4.5,
      medidaPotencia: 'kW',
      totalpotenciakw: 0
    };
  }

  /*Funcion para agregar ascensores a la previsión de servicios generales*/
  agregarAscensor() {
    //Comprobamos que el número de ascensores y potencia es positivo.
    if (this.modelAscensor.numAscensores < 1) {
      this.utilService.showAlert('Error num ascensor', 'El número de ascensores ha de ser positivo.')

    } else if (this.modelAscensor.potenciaMotorAsc < 0.1) {
      this.utilService.showAlert('Error potencia ascensor.','La potencia del ascensores ha de ser superior a 0.1.')

    } else {
      this.submitted = true;
      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;
      
      //calculamos y pasamos la potencia a kW según el valor del selector
      let potenciaConvertidaAsc = this.previsionesService.pasarakW( this.modelAscensor.potenciaMotorAsc, this.modelAscensor.medidaPotencia!);
      this.previsionesService.Pasc.update ((value: number)=>value +  this.modelAscensor.numAscensores*potenciaConvertidaAsc*1.3);


      this.previsionesService.listaAscensores.update((values: IAscensor[]) => [...values,{
        id: this.previsionesService.listaAscensores().length,
        numAscensores: this.modelAscensor.numAscensores,
        tipoMotorAsc: this.modelAscensor.tipoMotorAsc,
        potenciaMotorAsc: this.modelAscensor.potenciaMotorAsc,
        medidaPotencia: this.modelAscensor.medidaPotencia,
        totalpotenciakw: (this.modelAscensor.numAscensores*potenciaConvertidaAsc*1.3)

      }]);
      console.log('Agregado ascensor', this.modelAscensor.id, ' ', this.modelAscensor.numAscensores, ' x ', this.modelAscensor.potenciaMotorAsc,this.modelAscensor.medidaPotencia);
     

    }

   
  }


 

  cambiaPotAscensor(tipoMotor: any) {
    console.log('selmedpotasc', tipoMotor.value);
    const potAsc = document.getElementById("potAsc");
    document.getElementById("medPotMotorAsc")?.setAttribute("disabled","true");
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
        document.getElementById("medPotMotorAsc")?.setAttribute("disabled","false");
        return "0";
    }

  }

  agregarGrupoMotor() {

     //Comprobamos que el número de ascensores y potencia es positivo.
     if (this.modelGMotor.numGMotores < 1) {
      this.utilService.showAlert('Error num de motores', 'El número de motores ha de ser positivo.')

    } else if (this.modelGMotor.potenciaGMotor < 0.1) {
      this.utilService.showAlert('Error potencia motor.','La potencia del motor ha de ser superior a 0.1.')

    } else {
      this.submitted = true;
      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;
      
      this.modelGMotor.totalpotenciakw=this.modelGMotor.numGMotores*(this.previsionesService.pasarakW (this.modelGMotor.potenciaGMotor,this.modelGMotor.medidaPotencia));



      this.previsionesService.listaGMotor.update((values: IGMotor[]) => [...values,{
        id: this.previsionesService.listaGMotor().length,
        numGMotores: this.modelGMotor.numGMotores,
        potenciaGMotor: this.modelGMotor.potenciaGMotor,
        medidaPotencia: this.modelGMotor.medidaPotencia,
        totalpotenciakw: this.modelGMotor.totalpotenciakw
      }]);
      console.log('Agregado grupo motor', this.modelGMotor.id, ' ', this.modelGMotor.numGMotores, ' x ', this.modelGMotor.potenciaGMotor,
      this.modelGMotor.medidaPotencia, 'Total : ',this.modelGMotor.totalpotenciakw,'kW.');
     

    }
    this.submitted = true;
  }
  cambiaPotGMotor(elemen: any) {
    console.log('selmedpotGMOotor', JSON.stringify(elemen.value));

  }
}
