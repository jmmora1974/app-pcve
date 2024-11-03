import { Component, OnInit } from '@angular/core';
import { ServiPrevisionesService } from 'src/app/services/servi-previsiones.service';
import { ModalController } from '@ionic/angular';
import { MoldalViviendaPage } from './moldal-vivienda/moldal-vivienda.page';
import { IVivienda } from 'src/app/models/ivivienda';

import { IPrevision } from 'src/app/models/iprevision';
import { ModalServGeneralesPage } from './modal-serv-generales/modal-serv-generales.page';


@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.page.html',
  styleUrls: ['./previsiones.page.scss'],
})
export class PrevisionesPage {

  prevision=this.previsionesService.listaPrevisiones
  viviendas = this.previsionesService.viviendas$;
  prevision$ = this.previsionesService.prevision$;
  listaViviendas = this.previsionesService.listaViviendas;
  listaIrve$ = this.previsionesService.obtenListaIrve();
  previsionActual: IPrevision ={
    id:this.previsionesService.listaPrevisiones.length,
    Pviv: 0,
    Psgen: 0,
    Ploc: 0,
    Pgar: 0,
    Pirve: 0,
    Ptotal: 0,
    esquema: '1a',
    spl: false
  }

  P1: number = 0;
  P2: number = 0;
  P3: number = 0;
  P4: number = 0;
  P5: number = 0;

  PT: number = 0;


  agregarIrve() {
    throw new Error('Method not implemented.');
  }
  agregarGarage() {
    throw new Error('Method not implemented.');
  }
  agregarLocales() {
    throw new Error('Method not implemented.');
  }

  
  async agregarServGrales() {
    const modal = await this.modalCtrl.create({
      component: ModalServGeneralesPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.previsionesService.agregraServiciosGenerales(data);
      
      this.actualizaResultados();
      console.log('agregados servicios generales ', this.previsionActual);
      

    }

  }


  async agregarVivienda() {
    const modal = await this.modalCtrl.create({
      component: MoldalViviendaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.previsionesService.agregraVivienda(data);

      
      this.actualizaResultados();
      console.log('agregaod ', this.previsionActual);
      


    }

  }
  //Elimina la vivienda 

  eliminaVivienda(ev: any) {
    console.log("eliminando vivienda ID : ", JSON.stringify(ev.id));
    this.listaViviendas = this.previsionesService.eliminaVivienda(ev.id);
    this.listaIrve$ = this.previsionesService.obtenListaIrve();
    //this.prevision$ = this.previsionesService.calculaPT();
    
    this.actualizaResultados();

  }


  actualizaResultados() {

    let prevTemp= this.previsionesService.calculaPT();
    console.log("actua",prevTemp[0])
    this.previsionActual= prevTemp[0];
    this.P1 = this.previsionActual.Pviv;
    this.P2 = this.previsionActual.Psgen!;
    this.P3 = this.previsionActual.Ploc!;
    this.P4 = this.previsionActual.Pgar!;
    this.P5 = this.previsionActual.Pirve!;
    this.PT = this.previsionActual.Ptotal!;
    this.previsionActual.Ptotal

  }
  //Cambia el valor de la variable SPL si el edificio dispone del sistema SPL.
  cambiaSPL(argspl: boolean) {
    
    this.previsionesService.spl = argspl;
    this.actualizaResultados();
    //console.log('spl', arg0, 'total ', this.PTotal, this.P5);
  }

  cambiaEsquema(arg0: any) {
    this.previsionesService.esquemaVivienda = arg0.value;

    this.actualizaResultados();
    
  }


  constructor(
    private previsionesService: ServiPrevisionesService,
    private modalCtrl: ModalController
  ) { }




}
