

import { BehaviorSubject } from 'rxjs';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { ITipoVivienda, IVivienda } from '../models/ivivienda';
import { IPrevision } from '../models/iprevision';
import { UtilsService } from './utils.service';
import { IIrve } from '../models/iirve';



@Injectable({
  providedIn: 'root'
})


export class PrevisionesService {

  /*
  private viviendas = new BehaviorSubject<IVivienda[]>([]);
  private previsiones = new BehaviorSubject<IPrevision[]>([]);
  private prevision = new BehaviorSubject<IPrevision[]>([]);
  private irves = new BehaviorSubject<IIrve[]>([]);
  */

  listaViviendas: WritableSignal<IVivienda[]> = signal<IVivienda[]>([]);
  listaPrevisiones: WritableSignal<IPrevision[]> = signal<IPrevision[]>([]);
  listaIrve: WritableSignal<IIrve[]> = signal<IIrve[]>([]);

  prevision: WritableSignal<IPrevision> = signal<IPrevision>({
    id: 0,
    Pviv: 0,
    Psgen: 0,
    Ploc: 0,
    Pgar: 0,
    Pirve: 0,
    Ptotal: 0,
    esquema: '',
    spl: false
  }

  );
  //viviendas$ = this.viviendas.asObservable();
  //irves$ = this.irves.asObservable();

  //previsiones$ = this.previsiones.asObservable();
  //prevision$ = this.previsiones.asObservable();
  valorP1: number = 0;
  valorP2: number = 0;
  valorP3: number = 0;
  valorP4: number = 0;
  valorP5: number = 0;
  sumPotP1 = signal(0);
  sumvivP1 = signal(0);
  numTotalViviendas=signal(0);
  sumPotP1sinIrve: number = 0;
  sumPotP1conIrve: number = 0;
  sumPotP1med = signal(0);

  sumPotP1diurna: number = 0;
  sumVivconIrve: number = 0;
  sumPotP1nocturna: number = 0;
  PotP1diurMed: number = 0;
  cs = signal(0);

  numIrves: number = 0;

  public tablaITC10: number[] = [1, 2, 3, 3.8, 4.6, 5.4, 6.2, 7, 7.8, 8.5, 9.2, 9.9, 10.6, 11.3, 11.9, 12.5, 13.1, 13.7, 14.3, 14.8, 15.3];
  public tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion: 'Vivienda standard', potencia: 5.75 },
    { id: 2, nombre: 'Elevada', descripcion: 'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 3, nombre: 'Contratada', descripcion: 'Vivienda con potencia contratada o con tarifa nocturna.', potencia: 0 }
  ];
  numPlazasPkn = signal(0);



  constructor(utilsService: UtilsService) {

  }

  //Agrega la nueva vieneda al listado de viviendas de la previsión.
  agregraVivienda(nuevaViv: IVivienda) {
    const numV = this.listaViviendas().length;
    nuevaViv.id = numV;
    this.numTotalViviendas.update(()=>this.numTotalViviendas()+nuevaViv.numViviendas);
    console.log('numTotalViviendas',this.numTotalViviendas());
    //Agregamos la vivienda a la lista de viviendas.
    this.listaViviendas.update((values: IVivienda[]) => [...values, nuevaViv]);
    console.log("nueva viv ", nuevaViv);

    //Agregamos las viviendas con irve a la lista
    if (nuevaViv.conIrve! > 0) {
      this.listaIrve.update((values: IIrve[]) => [...values, {
        id: this.listaIrve().length,
        cantidad: nuevaViv.conIrve!,
        potencia: nuevaViv.potIrve!,
        tipoVivienda: nuevaViv.tipo
      }]);
    };


    console.log('Se ha agregado la vivienda ', nuevaViv);
    //this.calculaPT();
  }

  listaVivTemp = signal<IVivienda[]>([]);
  eliminaVivienda(indice: number) {
    
    this.listaVivTemp.set([]);
    let listaIrveTemp: IIrve[] = [];
    let contId = 0;
    let encontradoIrve: boolean = false;
    // return this.listaViviendas.update((values: any[])=>values.filter((vid:IVivienda)=>vid.id==indice));

    this.listaViviendas().forEach((element) => {
      if (element.id != indice) {
        element.id = contId;
        //console.log("No se ha eliminado vivienda ", element.id);
        this.listaVivTemp().push(element);
        contId++;

      } else {
        contId++;
        this.numTotalViviendas.update(()=>this.numTotalViviendas()-element.numViviendas);
        if (encontradoIrve==false) {
          let contIrve = 0;
          this.listaIrve().forEach(irvetemp => {

            if (element.conIrve == irvetemp.cantidad && element.potIrve == irvetemp.potencia) {
              encontradoIrve = true;
              console.log("Se ha eliminado el irve ", irvetemp.id);
            } else {

              irvetemp.id = contIrve;
              listaIrveTemp.push(irvetemp);
              contIrve++;
            }

            console.log("Se ha eliminado la vivienda  ", element.id);

          });
          this.listaIrve.set(listaIrveTemp);

        }


      }

    });
    this.listaViviendas.set([]);
    this.listaViviendas.update(...[], this.listaVivTemp);
    return this.listaVivTemp;

  }

  totalViviendas(): number {
    return this.listaViviendas.length;
  }

  

  //Calculamos el coeficente CS de la tabla tablaITC10
  calculaCoefSimult(coef: number): number {


    if (coef > 0) {
      if (coef > 0 && coef < 22) {
        //ssthis.cs.update(()=>this.calculaCoefSimult(this.sumvivP1()));

        this.cs.update((value: number) => value = this.tablaITC10[this.sumvivP1() - 1]);
        console.log('CS11: ', this.cs());
      } else if (this.sumvivP1() > 21) {
        let value1 = 0;
        this.cs.update(() => 15.3 + (this.sumvivP1() - 21) * 0.5);
        console.log('CS12: ', this.cs());
      }
    } else {
      alert('Error. Número erroneo para calcular el coeficiente de simulateneedad.');
    }
    console.log('CS: ', this.cs());
    return this.cs();
  }

  //Calcula la prevision de vivienda P1 Viv
  calculaP1(): number {
    //reseteamos valores de los contadores.
    this.valorP1 = 0;
    this.sumPotP1.set(0);
    this.sumPotP1sinIrve = 0;
    this.sumPotP1conIrve = 0;
    this.sumvivP1.set(0);
    this.sumPotP1med.set(0);
    this.cs.set(0);
    this.sumPotP1diurna = 0;
    this.sumVivconIrve = 0;
    this.sumPotP1nocturna = 0;
    this.PotP1diurMed = 0;
    this.numIrves = 0;

    this.listaViviendas().forEach((viviendan: IVivienda) => {
      //Calculamos las potencias y generamos la potencia media de la vivienda.
      this.sumPotP1.update((values: number) => values + (viviendan.numViviendas * viviendan.tipo.potencia));
      this.sumvivP1.update((values: number) => values + (viviendan.numViviendas));
      this.cs.update(() => this.calculaCoefSimult(this.sumvivP1()));
      this.sumPotP1med.update(() => this.sumPotP1() / this.sumvivP1());
      this.numIrves += viviendan.conIrve!;
      console.log('Potencia media: ', this.sumPotP1med());

      //Comprobamos el tipo de esquema para calcular la opcion
      switch (this.prevision().esquema) {
        case "2":
        case "4a":

          //Calculamos la previsión diurna
          if (viviendan.conIrve! > 0) {

            this.sumPotP1sinIrve += (viviendan.numViviendas - viviendan.conIrve!) * viviendan.tipo.potencia;
            this.sumPotP1conIrve += (viviendan.conIrve!) * (viviendan.tipo.potencia + 0.3 * viviendan.potIrve!);
            this.sumPotP1diurna += (this.sumPotP1sinIrve + this.sumPotP1conIrve);
            this.sumVivconIrve += viviendan.conIrve!;

          }
          else {
            this.sumPotP1diurna += (viviendan.numViviendas * viviendan.tipo.potencia);

          }
          this.PotP1diurMed = (this.sumPotP1diurna / this.sumvivP1());

          //Calculamos la previsión tarifa contratada o nocturna.4
          this.sumPotP1nocturna = 0.5 * this.sumPotP1med() * this.cs() + this.sumVivconIrve * 3.68;
          console.log('CS1: ', this.cs());
          console.log('noc', this.sumPotP1nocturna, 'diu', this.PotP1diurMed);

          if ((this.PotP1diurMed * this.cs()) >= this.sumPotP1nocturna) {
            this.sumPotP1med.update(() => this.PotP1diurMed);

          } else {
            this.sumPotP1med.update(() => this.sumPotP1nocturna / this.cs());
          }
          console.log("pot med caso 2:", this.sumPotP1med());
          break;
        default:

          // this.sumPotP1med= this.cs;
          break;

      }


    });

    let minIrve = Math.ceil(this.numPlazasPkn() / 10);
    console.log("10%", this.numIrves)
    if (this.numIrves < minIrve) {

      let vivTemp: IVivienda = this.listaViviendas()[this.listaViviendas().length - 1];

      console.log('irv', vivTemp, 'difff', minIrve - this.numIrves);
      if (vivTemp?.conIrve != undefined) {

        vivTemp.conIrve += (minIrve - this.numIrves);
        console.log('irv', vivTemp.conIrve);
        this.eliminaVivienda(vivTemp.id);
        this.agregraVivienda(vivTemp!);
        //this.calculaP1();
      }


      alert('Irve insuficientes. El mínimo de Irves ha de ser del 10% .Se ha modificado el calculo para ' + minIrve);
      //return 0;
    }


    this.valorP1 = this.sumPotP1med() * this.cs();

    console.log(" P1 : ", this.valorP1, 'cs ', this.cs(), ' pot med ', this.sumPotP1med());
    return this.valorP1;

  }
  //Calcula prevision servicios generales
  calculaP2(): number {
    return 0;
  }
  //Calcula prevision locales
  calculaP3(): number {
    return 0;
  }
  //Calcula prevision garage
  calculaP4(): number {
    return 0;
  }
  //Calcula prevision Irve excepto esquema 2 y 4a.
  calculaP5(): number {
    switch (this.prevision().esquema) {
      case "2":
      case "4a":
        return 0;
      default:
        this.valorP5 = 0;
        this.listaIrve().forEach((irve: { cantidad: number; potencia: number; }) => {
          this.valorP5 += (irve.cantidad * irve.potencia);
        });
        console.log('spl p5 ', this.prevision().spl);
        if (this.prevision().spl) {
          this.valorP5 *= 0.3;
        }
        return this.valorP5;
    }
  }

  calculaPT(): any {

    this.valorP1 = this.calculaP1();
    this.valorP2 = this.calculaP2();
    this.valorP3 = this.calculaP3();
    this.valorP4 = this.calculaP4();
    this.valorP5 = this.calculaP5();
    this.prevision.update((values: IPrevision) => values = {
      id: this.listaPrevisiones.length,
      Pviv: this.valorP1,
      Psgen: this.valorP2,
      Ploc: this.valorP3,
      Pgar: this.valorP4,
      Pirve: this.valorP5,
      Ptotal: this.valorP1 + this.valorP2 + this.valorP3 + this.valorP4 + this.valorP5,
      esquema: this.prevision().esquema,
      spl: this.prevision().spl
    });

    return this.prevision();

  }

  obtenListaViviendas(): IVivienda[] {
    return this.listaViviendas();
  }
  obtenListaIrve(): IIrve[] {
    return this.listaIrve();
  }
  agregraServiciosGenerales(data: any) {

  }

}




