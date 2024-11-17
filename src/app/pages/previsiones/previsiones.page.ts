import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { PrevisionesService } from '../../services/previsiones.service';
import { ModalController } from '@ionic/angular';
import { MoldalViviendaPage } from './moldal-vivienda/moldal-vivienda.page';
//import { IVivienda } from 'src/app/models/ivivienda';
//import { IPrevision } from 'src/app/models/iprevision';
import { ModalServGeneralesPage } from './modal-serv-generales/modal-serv-generales.page';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { IVivienda } from 'src/app/models/ivivienda';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.page.html',
  styleUrls: ['./previsiones.page.scss']
})
export class PrevisionesPage {
  /*
  prevision=this.previsionesService.listaPrevisiones
  viviendas = this.previsionesService.viviendas$;
  prevision$ = this.previsionesService.prevision$;
  listaViviendas = this.previsionesService.listaViviendas;
  listaIrve$ = this.previsionesService.obtenListaIrve();
  */
  previsionesService = inject(PrevisionesService);
  /* previsionActual: IPrevision ={
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
   */
  tiles: Tile[] = [
    { text: 'PViv', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'PSerGen', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'PLoc', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'PGar', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'PIrve', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'PTotal: ' + this.previsionesService.prevision().Ptotal.toString(), cols: 1, rows: 2, color: '#45F577' },
    { text: this.previsionesService.prevision().Pviv.toString(), cols: 1, rows: 1, color: '#D9F5D7' },
    { text: this.previsionesService.prevision().Psgen!.toString(), cols: 1, rows: 1, color: '#D9F5D7' },
    { text: this.previsionesService.prevision().Ploc!.toString(), cols: 1, rows: 1, color: '#D9F5D7' },
    { text: this.previsionesService.prevision().Pgar!.toString(), cols: 1, rows: 1, color: '#D9F5D7' },
    { text: this.previsionesService.prevision().Pirve!.toFixed(2), cols: 1, rows: 1, color: '#D9F5D7' },
  ];
  displayedColumnsViv: string[] = ['id', 'numViviendas','conIrve','tipo.nombre','tipo.potencia'];
  public dataSource: IVivienda[] = [{ id: 0, numViviendas: 11, tipo: { nombre: 'Básica', potencia: 3 }, conIrve: 1, potIrve: 3.68 },
                                   { id: 1, numViviendas: 5, tipo: { nombre: 'Básica', potencia: 4 }, conIrve: 2, potIrve: 3.68 }];

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
      //console.log('agregados servicios generales ', this.previsionActual);


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
      console.log('agregada vivienda: ', this.previsionesService.prevision);


    }

  }
  //Elimina la vivienda 
  eliminaVivienda(ev: any) {
    this.previsionesService.eliminaVivienda(ev.id);
    console.log("eliminando vivienda ID : ", JSON.stringify(ev.id));
    let listaVivTemp = this.previsionesService.eliminaVivienda(ev.id);
    //this.previsionesService.listaViviendas.update(listaVivTemp);
    //this.listaIrve$ = this.previsionesService.obtenListaIrve();
    //this.prevision$ = this.previsionesService.calculaPT();

    this.actualizaResultados();

  }


  actualizaResultados() {

    /*let prevTemp= this.previsionesService.calculaPT();
    
    console.log("actua",prevTemp[0])
    if (this.previsionesService.prevision()){
      this.previsionesService.prevision()= prevTemp[0];*/

    this.previsionesService.calculaPT();

    this.tiles[6].text = this.previsionesService.prevision().Pviv.toFixed(2);
    this.tiles[7].text = this.previsionesService.prevision().Psgen!.toFixed(2);
    this.tiles[8].text = this.previsionesService.prevision().Ploc!.toFixed(2);
    this.tiles[9].text = this.previsionesService.prevision().Pgar!.toFixed(2)
    this.tiles[10].text = this.previsionesService.prevision().Pirve!.toFixed(2);
    this.tiles[5].text = "Prevision Total " + this.previsionesService.prevision().Ptotal.toFixed(2);

    console.log('tile ', this.tiles[6].text);

    //}



  }
  //Cambia el valor de la variable SPL si el edificio dispone del sistema SPL.
  cambiaSPL(argspl: boolean) {

    this.previsionesService.prevision().spl = argspl;

    this.actualizaResultados();
    //console.log('spl', arg0, 'total ', this.PTotal, this.P5);
  }

  cambiaEsquema(arg0: any) {
    this.previsionesService.prevision().esquema = arg0.value;
    // this.previsionesService.calculaPT();

    this.actualizaResultados();

  }

  constructor(

    private modalCtrl: ModalController
  ) { }




}
