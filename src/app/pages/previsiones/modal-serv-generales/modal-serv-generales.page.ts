
import {ChangeDetectionStrategy, Component, signal, OnInit, input, Input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { IAscensor } from 'src/app/models/iascensor';

@Component({
  selector: 'app-modal-serv-generales',
  templateUrl: './modal-serv-generales.page.html',
  styleUrls: ['./modal-serv-generales.page.scss'],
})
export class ModalServGeneralesPage implements OnInit {
  submitted = false;
  public tipoPotAscensor : string[]=['ITA-1','ITA-2','ITA-3','ITA-4','ITA-5','ITA-6','OTRO'];
  model:IAscensor;
  @Input()  numAsc:any;
onSubmit() { this.submitted = true; }

  constructor() { 
    this.model={
      id: 0,
      numAscensores: 2,
      tipoMotorAsc:'ITA-1',
      potenciaMotorAsc: 2
      } ;
  }

  ngOnInit() {
  }

  agregarAscensor(){

  }

}
