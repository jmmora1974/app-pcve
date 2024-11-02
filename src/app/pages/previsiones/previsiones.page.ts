import { Component, OnInit } from '@angular/core';
import { ServiPrevisionesService } from 'src/app/services/servi-previsiones.service';
import { ModalController } from '@ionic/angular';
import { MoldalViviendaPage } from './moldal-vivienda/moldal-vivienda.page';
import { IVivienda } from 'src/app/models/ivivienda';

@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.page.html',
  styleUrls: ['./previsiones.page.scss'],
})
export class PrevisionesPage {

  viviendas = this.previsionesService.viviendas$;
  prevision$ = this.previsionesService.prevision$;
  listaViviendas = this.previsionesService.listaViviendas;
  listaIrve=this.previsionesService.obtenListaIrve();
  PTotal: number = 0;
  P1: number = 0;
  P2: number = 0;
  P3: number = 0;
  P4: number = 0;
  P5: number = 0;
  


  agregarIrve() {
    throw new Error('Method not implemented.');
  }
  agregarGarage() {
    throw new Error('Method not implemented.');
  }
  agregarLocales() {
    throw new Error('Method not implemented.');
  }
  agregarServGrales() {
    throw new Error('Method not implemented.');
  }


  async agregarVivienda() {
    const modal = await this.modalCtrl.create({
      component: MoldalViviendaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.previsionesService.agregraVivienda(data);
      this.PTotal = this.previsionesService.calculaPT();
      this.P1 = this.previsionesService.valorP1;
      this.P5 = this.previsionesService.valorP5
    }

  }
  //Elimina la vivienda 
  eliminaVivienda(ev:any) {
    console.log ("eliminando vivienda ID : ",JSON.stringify(ev.id));
    this.listaViviendas=this.previsionesService.eliminaVivienda(ev.id);
    this.listaIrve=this.previsionesService.obtenListaIrve();
      this.PTotal = this.previsionesService.calculaPT();
      this.P1 = this.previsionesService.valorP1;
      this.P5 = this.previsionesService.valorP5;
      
    }

  //Cambia el valor de la variable SPL si el edificio dispone del sistema SPL.
  cambiaSPL(arg0: boolean) {
    //console.log ('spl', arg0);
    this.previsionesService.spl = arg0;
    this.PTotal = this.previsionesService.calculaPT();
      this.P1 = this.previsionesService.valorP1;
      this.P5 = this.previsionesService.valorP5;
      console.log ('spl', arg0, 'total ', this.PTotal, this.P5);
  }

  cambiaEsquema(arg0: any) {
      this.previsionesService.esquemaVivienda=arg0.value;
      this.PTotal = this.previsionesService.calculaPT();
      this.P1 = this.previsionesService.calculaP1();
      this.P5 = this.previsionesService.calculaP5();

    }

  constructor(
    private previsionesService: ServiPrevisionesService,
    private modalCtrl: ModalController
  ) { }




}
