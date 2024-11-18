
import { JsonPipe } from '@angular/common';
import { Component, signal, OnInit,  WritableSignal} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IAscensor } from 'src/app/models/iascensor';


@Component({
  selector: 'app-modal-serv-generales',
  templateUrl: './modal-serv-generales.page.html',
  styleUrls: ['./modal-serv-generales.page.scss'],
})
export class ModalServGeneralesPage implements OnInit {
  submitted = false;
  public tipoPotAscensor : string[]=['ITA-1','ITA-2','ITA-3','ITA-4','ITA-5','ITA-6','OTRO'];
  public medidorPotencia: string[]=['kW','W','cV'];
  formAscensor!: FormGroup;
  modelAscensor!:IAscensor;
  listaAscensores: WritableSignal<IAscensor[]> = signal<IAscensor[]>([]);

  //@Input()  numAsc:any;


  constructor(private fbAsc:FormBuilder) { 
    this.modelAscensor={
      id: 0,
      numAscensores: 2,
      tipoMotorAsc:'ITA-1',
      potenciaMotorAsc: 2
      } ;

      this.formAscensor = this.fbAsc.group({
        id: new FormControl(0, Validators.required),
        numAscensores: new FormControl(0, Validators.required),
        tipoMotorAsc: new FormControl('ITA-1', Validators.required),
        potenciaMotorAsc: new FormControl(0, Validators.required),
       
      });
  }

  ngOnInit() {
  }

  agregarAscensor(){
    this.submitted = true; 
    console.log('Formascen ',this.formAscensor.value);
    console.log('modelasc',this.modelAscensor);
    this.modelAscensor.id=this.listaAscensores().length;
    this.listaAscensores.update((values:IAscensor[])=>[...values,this.modelAscensor]);
   }

   agregarGrupoMotor(){
    this.submitted = true; 
   }

}
