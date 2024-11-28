


import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ITipoVivienda, IVivienda } from '../models/ivivienda';
import { IPrevision } from '../models/iprevision';
import { UtilsService } from './utils.service';
import { IIrve } from '../models/iirve';
import { IAscensor } from '../models/iascensor';
import { IGMotor } from '../models/igmotor';
import { IAlumbrado } from '../models/ialumbrado';
import { ILocal } from '../models/ilocal';



@Injectable({
  providedIn: 'root'
})


export class PrevisionesService {
 


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

  valorP1: number = 0;
  valorP2: number = 0;
  valorP3: number = 0;
  valorP4: number = 0;
  valorP5: number = 0;

  /* Variables necesarias para el calculo de P vivienda */
  sumPotP1 = signal(0);
  sumvivP1 = signal(0);
  numTotalViviendas = signal(0);
  sumPotP1sinIrve: number = 0;
  sumPotP1conIrve: number = 0;
  sumPotP1med = signal(0);

  sumPotP1diurna: number = 0;
  sumVivconIrve: number = 0;
  sumPotP1nocturna: number = 0;
  PotP1diurMed: number = 0;
  cs = signal(0);


  /** Variables para locales */
  Ploc=signal(0);
  listaLocales: WritableSignal<ILocal[]> = signal<ILocal[]>([]);

   /** Variables para Irves */
  numIrves: number = 0;

  public tablaITC10: number[] = [1, 2, 3, 3.8, 4.6, 5.4, 6.2, 7, 7.8, 8.5, 9.2, 9.9, 10.6, 11.3, 11.9, 12.5, 13.1, 13.7, 14.3, 14.8, 15.3];
  public tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion: 'Vivienda standard', potencia: 5.75 },
    { id: 2, nombre: 'Elevada', descripcion: 'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 3, nombre: 'Contratada', descripcion: 'Vivienda con potencia contratada o con tarifa nocturna.', potencia: 0 }
  ];
  numPlazasPkn = signal(0);

  /* Variables necesarias para calcular  P Servicios gnerales */
  listaAscensores: WritableSignal<IAscensor[]> = signal<IAscensor[]>([]);
  listaGMotor: WritableSignal<IGMotor[]> = signal<IGMotor[]>([]);
  listaAlumbrado: WritableSignal<IAlumbrado[]> = signal<IAlumbrado[]>([]);
  Pasc = signal(0);  //Prevision ascensor
  Pgm = signal(0); //Pervision grupo motor
  PAlum = signal(0); //Pervision alumbrado
  PgmmaxPot: IGMotor = {
    id: 0,
    numGMotores: 0,
    potenciaGMotor: 0,
    medidaPotencia: 'kW',
    totalpotenciakw: 0
  };



  //Servicios de mensajeria
  utilService = inject(UtilsService);
  

  //Constructor
  constructor() {

  }


  /***  VIVIENDAS  *********/
  //Agrega la nueva vieneda al listado de viviendas de la previsión.
  agregraVivienda(nuevaViv: IVivienda) {
    const numV = this.listaViviendas().length;
    nuevaViv.id = numV;
    this.numTotalViviendas.update(() => this.numTotalViviendas() + nuevaViv.numViviendas);
    console.log('numTotalViviendas', this.numTotalViviendas());
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
        this.numTotalViviendas.update(() => this.numTotalViviendas() - element.numViviendas);
        if (encontradoIrve == false) {
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

  /*--- SERVICIOS GENERALES --*/

  /*--- Funcion para agregar ascensor --*/
  agregraAscensor(modelAsc: IAscensor) {
    //calculamos y pasamos la potencia a kW según el valor del selector
    let potenciaConvertidaAsc = this.pasarakW(modelAsc.potenciaMotorAsc, modelAsc.medidaPotencia!);
    this.Pasc.update((value: number) => value + modelAsc.numAscensores * potenciaConvertidaAsc * 1.3);

    modelAsc.id=this.listaAscensores().length;
    this.listaAscensores.update((values: IAscensor[]) => [...values, {
      id: modelAsc.id,
      numAscensores: modelAsc.numAscensores,
      tipoMotorAsc: modelAsc.tipoMotorAsc,
      potenciaMotorAsc: modelAsc.potenciaMotorAsc,
      medidaPotencia: modelAsc.medidaPotencia,
      totalpotenciakw: (modelAsc.numAscensores * potenciaConvertidaAsc * 1.3)

    }]);
    this.utilService.showAlert('Creado ascensor.', 'Agregado ascensor con ' + modelAsc.id + ' :  ' + modelAsc.numAscensores + ' de ' + modelAsc.potenciaMotorAsc + modelAsc.medidaPotencia);
    console.log('Agregado ascensor', modelAsc.id, ' ', modelAsc.numAscensores, ' x ', modelAsc.potenciaMotorAsc, modelAsc.medidaPotencia);

  }
  /*--- Funcion para agregar grupo motor --*/
  agregarGrupoMotor(mGMotor: IGMotor) {

    //calculamos y pasamos la potencia a kW según el valor del selector
    // ya obtenido el motor de mayor potencia, se ha de multiplicar por 1.25, por lo tanto solo sumamos el res de multiplicar por 0.25
    let potenciaConvertidaGM = this.pasarakW(mGMotor.potenciaGMotor, mGMotor.medidaPotencia);
    if (this.listaGMotor().length == 0 || this.PgmmaxPot==undefined) {
      this.PgmmaxPot = mGMotor;
      this.PgmmaxPot.totalpotenciakw = potenciaConvertidaGM;
      this.Pgm.update((value: number) => value + potenciaConvertidaGM * 0.25);

    } else {
      //let potenciaConvertidaGMMayor = this.pasarakW(this.PgmmaxPot.potenciaGMotor, this.PgmmaxPot.medidaPotencia);
      //this.PgmmaxPot.totalpotenciakw = potenciaConvertidaGMMayor;

      if ( this.PgmmaxPot.totalpotenciakw! < potenciaConvertidaGM) {
        console.log('potrcomnve max', this.PgmmaxPot.totalpotenciakw, 'valoe ', this.Pgm());

        this.Pgm.update((value: number) => value - (this.PgmmaxPot.totalpotenciakw! * 0.25));
        
        this.Pgm.update((value: number) => value + potenciaConvertidaGM * 0.25);
        

        console.log('potrcomnve max desp', this.PgmmaxPot.totalpotenciakw, 'valo ', this.Pgm(),mGMotor);
        this.PgmmaxPot = mGMotor;
        //this.PgmmaxPot.numGMotores = 1;  //por si queremos calcular el valor de un solo motor
        this.PgmmaxPot.totalpotenciakw = potenciaConvertidaGM;

      } else {
        console.log("LA POT ES MAYOR.", mGMotor, 'pote conv',potenciaConvertidaGM);
      }


    }


    //Actualizamos el valor de Prevision grupo motor

    this.Pgm.update((value: number) => value + (mGMotor.numGMotores * potenciaConvertidaGM));

    mGMotor.totalpotenciakw = mGMotor.numGMotores * potenciaConvertidaGM;
    mGMotor.id= this.listaGMotor().length;
    this.listaGMotor.update((values: IGMotor[]) => [...values, {
      id: mGMotor.id,
      numGMotores: mGMotor.numGMotores,
      potenciaGMotor: mGMotor.potenciaGMotor,
      medidaPotencia: mGMotor.medidaPotencia,
      totalpotenciakw: mGMotor.totalpotenciakw
    }]);
    this.utilService.showAlert('Creado grupo motor.', 'Agregado grupo motor con id  ' + mGMotor.id + ' : ' + mGMotor.numGMotores + '  de ' + mGMotor.potenciaGMotor +
      mGMotor.medidaPotencia + 'Total : ' + mGMotor.totalpotenciakw + ' kW.');
    console.log('Agregado grupo motor', mGMotor.id, ' ', mGMotor.numGMotores, ' x ', mGMotor.potenciaGMotor,
      mGMotor.medidaPotencia, 'Total : ', mGMotor.totalpotenciakw, 'kW.');


  }
/*--- Funcion para agregar alumbrado --*/
agregarAlumbrado (mAlumbrado:IAlumbrado){
  if (mAlumbrado.mtsAlumbrado! > 0) {
    //Calculamos y sumamos la potencia de alumbado de caja de escalera y/o portal y espacios comunes.
    mAlumbrado.totalPotenciaAlumkW += mAlumbrado.mtsAlumbrado! * mAlumbrado.tipoAlumbrado!.potAlum;
  };
    if (mAlumbrado.potLamparas! > 0 )  {

      //Calculamos por numero de lamparas y potencia
      let potTempLamp = mAlumbrado.numLamparas! * mAlumbrado.potLamparas!;
      console.log('potTempLamp', potTempLamp);
      //comprobamos si está en kW o W
      if (mAlumbrado.medidaPotencia?.toUpperCase() == "W") {
        //console.log("es lampara W");
        potTempLamp = potTempLamp/ 1000;
      }
      //Si son lamparas de descarga fluorescentes, se multiplica por el coef 1,8
      if (mAlumbrado.lampFluorescente) {
        console.log("es lampara fluorescente");
        potTempLamp *= 1.8;
      }
      mAlumbrado.totalPotenciaAlumkW+=potTempLamp;
    } 
   
  
  if (mAlumbrado.totalPotenciaAlumkW>0){ 
    mAlumbrado.id= this.listaAlumbrado().length;
    this.PAlum.update((value: number) => value + mAlumbrado.totalPotenciaAlumkW);
    this.listaAlumbrado.update((values: IAlumbrado[]) => [...values, mAlumbrado]);
    this.utilService.showAlert('Creado alumbrado','Agregado alumbrado con id :' +mAlumbrado.id+ ' de ' +mAlumbrado.mtsAlumbrado +' mts de '
      + mAlumbrado.tipoAlumbrado?.nombreAlum +' y '+mAlumbrado.numLamparas + ' de '+mAlumbrado.potLamparas + mAlumbrado.medidaPotencia 
      +' fluorescencia '+ mAlumbrado.lampFluorescente);
    console.log('Se ha agregado el alumbrado.', mAlumbrado , 'listado',this.listaAlumbrado() );
    
  } else {

    console.log("No hay nada calculado.")
  }
  
}
/*--- Funcion para agregar locales --*/
agregarLocal(mLocal: ILocal) {

  if(mLocal.potLocal>0 && mLocal.totalPotenciaLocalkW>0 ){

    this.Ploc.update ((value:number)=>value+mLocal.totalPotenciaLocalkW);
  } else {
      mLocal=this.calculaPotLocal(mLocal);
      this.Ploc.update ((value:number)=>value+mLocal.totalPotenciaLocalkW);
  }
  mLocal.id=this.listaLocales().length;
  this.listaLocales.update((values:ILocal[])=>[...values,mLocal]);
  console.log("Agregado local ", mLocal);
    
}

calculaPotLocal(cLoc:ILocal ):ILocal{
  if (cLoc.mtsLocal<34.5) {
      cLoc.potLocal=3.45;
  }else {
    cLoc.potLocal=cLoc.mtsLocal*0.1;
  }
  
  cLoc.totalPotenciaLocalkW=cLoc.numLocales*cLoc.potLocal;

  return cLoc;

}



  /*--- Funcion para eliminar ascensor --*/
  eliminaAscensor(idAsc: IAscensor) {
    let listaAscTemp: IAscensor[] = [];
    let contAsc = 0;
    let encontradoAsc: boolean = false;
    this.listaAscensores().forEach((item) => {
      if (item.id != idAsc.id) {
        listaAscTemp.push(item);
        contAsc++;
      } else {
        encontradoAsc = true;
        this.Pasc.update((value: number) => value - item.totalpotenciakw!);
        console.log('eliminado ', idAsc);
      }
    });
    if (encontradoAsc) {
      this.listaAscensores.set(listaAscTemp);
    }

  }

  /* Funcion para eliminar grupo motor.*/
  eliminaGrupoMotor(idGM: IGMotor) {
    let contGM = 0;
    let listaGMTemp: IGMotor[] = [];
    let encontradoGM: boolean = false;
    this.listaGMotor().forEach((itemgm) => {

      if (itemgm.id != idGM.id) {
        itemgm.id=contGM;
        listaGMTemp.push(itemgm);
        contGM++;
      } else {
        encontradoGM = true;
        this.Pgm.update((value: number) => value - itemgm.totalpotenciakw!);
        console.log('eliminado GM', idGM);

      }
    });

    if (encontradoGM) {
       this.listaGMotor.set(listaGMTemp);
        this.Pgm.update((value: number) => value - (this.PgmmaxPot.totalpotenciakw! * 0.25));
        this.PgmmaxPot = this.buscaGMmasPotente();
        console.log('El motor mas pot de busca',this.PgmmaxPot);
        this.PgmmaxPot.totalpotenciakw = this.pasarakW(this.PgmmaxPot.potenciaGMotor, this.PgmmaxPot.medidaPotencia);
        this.Pgm.update((value: number) => value + (this.PgmmaxPot.totalpotenciakw! * 0.25));
      }

      if (listaGMTemp.length == 0) {
        this.PgmmaxPot != null; //Si la lista de GM esta vacia reseteamos la variable de motor de mayor potencia.(no a 0 para no confundir con el id 0)
        this.Pgm.set(0);
      }
      

    }
  
  //Funcion que busca el motor de mayor potencia y retorna un IGMotor.
  buscaGMmasPotente():IGMotor {
    let GMTemp: IGMotor;
    this.listaGMotor().forEach(elementgm => {
      let potMotTemp = this.pasarakW(elementgm.potenciaGMotor, elementgm.medidaPotencia);
      if (!GMTemp || potMotTemp > GMTemp.totalpotenciakw!) {
        GMTemp = elementgm;
        GMTemp.totalpotenciakw = potMotTemp;
      }

    });
    return GMTemp!;
  }
  /* Funcion para eliminar alumbrado.*/
  eliminaAlumbrado(moAlumbrado: IAlumbrado) { 
    //Actualizamos el valor de Palum
    this.PAlum.update((value: number) => value - moAlumbrado.totalPotenciaAlumkW);
    
    //Eliminamos y reordenamos la lista alumbrado
    let encontradoAlum:boolean=false;
    let listaAlumTemp:IAlumbrado[]=[];
    let contAlumElim=0;
    this.listaAlumbrado().forEach((elemAl:IAlumbrado)=>{
      console.log('buscando',elemAl);
        if (elemAl.id!=moAlumbrado.id){
          elemAl.id=contAlumElim;
          listaAlumTemp.push(elemAl);
          contAlumElim++;
          console.log('agregado',elemAl,"lista temp alumb ",listaAlumTemp);
        }else {
          encontradoAlum=true;
       }
    });

    if (encontradoAlum){ 
      console.log("lista temp encontrado ",listaAlumTemp);
        this.listaAlumbrado.set(listaAlumTemp);
      }
    


  }

/* Funcion para eliminar local.*/
  eliminarLocal(local: ILocal) {
     //Actualizamos el valor de Palum
     this.Ploc.update((value: number) => value - local.totalPotenciaLocalkW);
    
     //Eliminamos y reordenamos la lista alumbrado
     let encontradoLocal:boolean=false;
     let listaLocalTemp:ILocal[]=[];
     let contLocElim=0;
     this.listaLocales().forEach((elemLocal:ILocal)=>{
       console.log('buscando local',elemLocal);
         if (elemLocal.id!=local.id){
          elemLocal.id=contLocElim;
           listaLocalTemp.push(elemLocal);
           contLocElim++;
           console.log('agregado',elemLocal,"lista temp alumb ",listaLocalTemp);
         }else {
           encontradoLocal=true;
        }
     });
 
     if (encontradoLocal){ 
       console.log("lista temp encontrado ",listaLocalTemp);
         this.listaLocales.set(listaLocalTemp);
       }
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

    return this.Pasc() + this.Pgm() + this.PAlum();
  }
  //Calcula prevision locales
  calculaP3(): number {
    return this.Ploc();
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


  obtenListaIrve(): IIrve[] {
    return this.listaIrve();
  }

  agregraServiciosGenerales(data: any) {

  }

  pasarakW(poten: number, idmedida: string = 'kW'): number {
    //calculamos y pasamos la potencia a kW según el valor del selector
    //const valorElem: IonSelect = document.getElementById(idElem)! as unknown as IonSelect;
    console.log('poten pasara kw', poten, 'ideelm', idmedida, 'leido.');
    if (idmedida == 'W') {
      return poten / 1000;
    }
    if (idmedida == 'cV') {
      return poten * 0.736;
    }
    if (idmedida == 'kW') {
      return poten;
    }
    console.log('Valor no reconocido en ' + idmedida + ' con valor ' + poten);
    return 0;
  }

}




