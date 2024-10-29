import { Component, OnInit } from '@angular/core';
import { ITipoVivienda } from 'src/app/models/ivivienda';
import { ServiPrevisionesService } from 'src/app/services/servi-previsiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { IIrve } from 'src/app/models/iirve';

@Component({
  selector: 'app-modal-irve',
  templateUrl: './modal-irve.page.html',
  styleUrls: ['./modal-irve.page.scss'],
})
export class ModalIrvePage implements OnInit {
formIrve!: FormGroup;
listaIrve: IIrve[]=[];
tipoViviendasIrve:ITipoVivienda[]=[];
nuevoIrve:IIrve={
  id: this.listaIrve.length,
  cantidad: 0,
  potencia: 3.68,
  tipoVivienda: this.tipoViviendasIrve[0]
};
cancel() {
throw new Error('Method not implemented.');
}
agregaIrve() {
throw new Error('Method not implemented.');
}
 
  constructor(previsionesService: ServiPrevisionesService) { 
    this.tipoViviendasIrve=  previsionesService.tipoViviendas;
    

  }

  ngOnInit() {
  }

}
