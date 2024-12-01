import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITipoVivienda, IVivienda } from '../models/ivivienda';
import { IPrevision } from '../models/iprevision';
import { UtilsService } from './utils.service';
import { IIrve } from '../models/iirve';

@Injectable({
  providedIn: 'root'
})
export class ServiPrevisionesService {
 
  private viviendas = new BehaviorSubject<IVivienda[]>([]);
  private previsiones = new BehaviorSubject<IPrevision[]>([]);
  private prevision = new BehaviorSubject<IPrevision[]>([]);
  private irve = new BehaviorSubject<IIrve[]>([]);
  listaViviendas: IVivienda[] = [];
  listaPrevisiones: IPrevision[] = [];
  listaIrve: IIrve[] = [];
  viviendas$ = this.viviendas.asObservable();
  irves$ = this.irve.asObservable();

  previsiones$ = this.previsiones.asObservable();
  prevision$ = this.previsiones.asObservable();
  valorP1: number = 0;
  valorP2: number = 0;
  valorP3: number = 0;
  valorP4: number = 0;
  valorP5: number = 0;

  esquemaVivienda: string | undefined;
  spl!: boolean;
  public tablaITC10: number[] = [1, 2, 3, 3.8, 4.6, 5.4, 6.2, 7, 7.8, 8.5, 9.2, 9.9, 10.6, 11.3, 11.9, 12.5, 13.1, 13.7, 14.3, 14.8, 15.3];
  public tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion: 'Vivienda standard', potencia: 5.75 },
    { id: 2, nombre: 'Elevada', descripcion: 'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 3, nombre: 'Contratada', descripcion: 'Vivienda con potencia contratada o con tarifa nocturna.', potencia: 0 }
  ];
  
   

  constructor(utilsService: UtilsService) {
  
   }

  //Agrega la nueva vieneda al listado de viviendas de la previsión.
  agregraVivienda(viv: IVivienda) {
    const numV = this.listaViviendas.length;
    viv.id = numV;
    //Agregamos la vivienda a la lista de viviendas.
    this.listaViviendas.push(viv);

    //Agregamos las viviendas con irve a la lista
    if (viv.conIrve! > 0) {
      this.listaIrve.push({
        id: viv.id,
        cantidad: viv.conIrve!,
        potencia: viv.potIrve!,
        tipoVivienda: viv.tipo
      });
    };
    this.viviendas.next(this.listaViviendas);
    this.irve.next(this.listaIrve);

    console.log('Se ha agregado la vivienda ', viv);
    //this.calculaPT();
  }


  eliminaVivienda(indice: number) {

    let listaVivTemp: IVivienda[] = [];
    let listaIrveTemp: IIrve[] = [];
    let contId = 0;

    this.listaViviendas.forEach(element => {
      if (element.id != indice) {

        listaVivTemp.push(element);
        contId++;

      } else {
        let contIdi = 0;

        this.listaIrve.forEach(irvetemp => {

          if (element.id != irvetemp.id) {
            listaIrveTemp.push(irvetemp);


          } else {
            console.log("Se ha eliminado vivienda ", element.id);

          }

        });
        this.listaIrve = listaIrveTemp;
    
      }

    });

    this.listaViviendas = listaVivTemp;
    return listaVivTemp;
  }

  totalViviendas(): number {
    return this.listaViviendas.length;
  }

  sumPotP1: number = 0;
  sumvivP1: number = 0;
  sumPotP1sinIrve: number = 0;
  sumPotP1conIrve: number = 0;
  sumPotP1med: number = 0;
  sumPotP1diurna: number = 0;
  sumVivconIrve: number= 0;
  sumPotP1nocturna: number= 0;
  PotP1diurMed: number=0;
  cs: number = 0;
  numIrves: number=0;
  //Calcula la prevision de vivienda P1 Viv
  calculaP1(): number {
    this.sumPotP1 = 0;
    this.sumPotP1sinIrve = 0;
    this.sumPotP1conIrve = 0;
    this.sumvivP1 = 0;
    this.sumPotP1med = 0;
    this.sumPotP1diurna = 0;
    this.sumVivconIrve =0;
    this.sumPotP1nocturna= 0;
    this.PotP1diurMed=0;
    this.numIrves=0;

    this.listaViviendas.forEach(viviendan => {
      //Calculamos las potencias y generamos la potencia media de la vivienda.
      this.sumPotP1 += viviendan.numViviendas * viviendan.tipo.potencia;
      this.sumvivP1 += viviendan.numViviendas;
      this.numIrves += viviendan.conIrve!;
      this.sumPotP1med=this.sumPotP1/this.sumvivP1;
       //Calculamos el coeficente CS de la tabla tablaITC10
    if (this.sumvivP1 > 0) {
      if (this.sumvivP1 > 0 && this.sumvivP1 < 22) {
        this.cs = this.tablaITC10[this.sumvivP1 - 1];
      } else if (this.sumvivP1 > 21) {
        this.cs = 15.3 + (this.sumvivP1 - 21) * 0.5;
      }
    } 
      //Comprobamos el tipo de esquema para calcular la opcion
      switch (this.esquemaVivienda) {
        case "2":
        case "4a":

           //Calculamos la previsión diurna
          if (viviendan.conIrve! > 0) {
            
            this.sumPotP1sinIrve += (viviendan.numViviendas - viviendan.conIrve!) * viviendan.tipo.potencia;
            this.sumPotP1conIrve += (viviendan.conIrve!) * (viviendan.tipo.potencia + 0.3 * viviendan.potIrve!);
            this.sumPotP1diurna += (this.sumPotP1sinIrve + this.sumPotP1conIrve);
            this.sumVivconIrve+=viviendan.conIrve!;
           
          }
          else {
            this.sumPotP1diurna += (viviendan.numViviendas * viviendan.tipo.potencia);

          }
          this.PotP1diurMed=  (this.sumPotP1diurna /this.sumvivP1)*this.cs ;
          
          //Calculamos la previsión tarifa contratada o nocturna.4
          this.sumPotP1nocturna = 0.5*this.sumPotP1med*this.cs+this.sumVivconIrve*3.68;

          console.log('noc',this.sumPotP1nocturna, 'diu', this.PotP1diurMed );

          if (this.PotP1diurMed>= this.sumPotP1nocturna){
            this.sumPotP1med= this.PotP1diurMed;
          } else {
            this.sumPotP1med= this.sumPotP1nocturna;
          }
          break;
        default:
          
        this.sumPotP1med *= this.cs;
          break;

      }


    });

    let minIrve=Math.ceil(this.sumvivP1/10);
    console.log( "10%",this.numIrves)
    if ( this.numIrves< minIrve){
      
      let vivTemp:IVivienda  = this.listaViviendas[this.listaViviendas.length-1];
      
      console.log('irv',vivTemp,'difff', minIrve-this.numIrves);
      if (vivTemp?.conIrve!=undefined){
        
        vivTemp.conIrve+=(minIrve-this.numIrves);
        console.log('irv',vivTemp.conIrve);
        this.eliminaVivienda(vivTemp.id);
        this.agregraVivienda(vivTemp!);
        //this.calculaP1();
      }
      
      
      alert('Irve insuficientes. El mínimo de Irves ha de ser del 10% .Se ha modificado el calculo para '+minIrve );
      //return 0;
    }
    

    this.valorP1 = this.sumPotP1med ;

    console.log(" P1 : ", this.valorP1);
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
    switch (this.esquemaVivienda) {
      case "2":
      case "4a":
        return 0;
      default:
        this.valorP5 = 0;
        this.listaIrve.forEach(irve => {
          this.valorP5 += irve.cantidad * irve.potencia;
        });
        console.log('spl p5 ', this.spl);
        if (this.spl) {
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
    this.prevision.next([{
      id: this.listaPrevisiones.length,
      Pviv: this.valorP1,
      Psgen: this.valorP2,
      Ploc: this.valorP3,
      Pgar: this.valorP4,
      Pirve: this.valorP5,
      Ptotal: this.valorP1 + this.valorP2 + this.valorP3 + this.valorP4 + this.valorP5,
      esquema: this.esquemaVivienda,
      spl: this.spl
    }]);
   
    return this.prevision.value;

  }

  obtenListaViviendas(): any {
    return this.viviendas$
  }
  obtenListaIrve(): IIrve[] {
    return this.listaIrve;
  }
  agregraServiciosGenerales(data: any) {
     
  }

}



