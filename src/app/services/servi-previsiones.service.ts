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
  listaViviendas: IVivienda[] = [];
  listaPrevisiones: IPrevision[] = [];
  listaIrve: IIrve[] = [];
  viviendas$ = this.viviendas.asObservable();

  previsiones$ = this.previsiones.asObservable();
  prevision$ = this.previsiones.asObservable();
  valorP1: number = 0;
  valorP2: number = 0;
  valorP3: number = 0;
  valorP4: number = 0;
  valorP5: number = 0;
  esquemaVivienda: string | undefined;
  spl: boolean = false;
  public tablaITC10: number[] = [1, 2, 3, 3.8, 4.6, 5.4, 6.2, 7, 7.8, 8.5, 9.2, 9.9, 10.6, 11.3, 11.9, 12.5, 13.1, 13.7, 14.3, 14.8, 15.3];
  public tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion: 'Vivienda standard', potencia: 5.75 },
    { id: 2, nombre: 'Elevada', descripcion: 'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 3, nombre: 'Contratada', descripcion: 'Vivienda con potencia contratada o con tarifa nocturna.', potencia: 0 }
  ];
  static tipoViviendas: any;

  constructor(utilsService: UtilsService) { }

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
    console.log('Se ha agregado la vivienda ', viv);
    this.calculaPT();
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

          if (element.id == irvetemp.id) {
            listaVivTemp.push(element);


          } else {
            console.log("Se  ha eliminado ", element.id, ' queda ', listaVivTemp);

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

  cs: number = 0;

  //Calcula la prevision de vivienda P1 Viv
  calculaP1(): number {
    this.sumPotP1 = 0;
    this.sumPotP1sinIrve = 0;
    this.sumPotP1conIrve = 0;
    this.sumvivP1 = 0;
    this.listaViviendas.forEach(viviendan => {
      switch (this.esquemaVivienda) {
        case "2":
        case "4a":
          console.log("estamos en esquema 2");
          if (viviendan.conIrve! > 0) {
            this.sumPotP1sinIrve += (viviendan.numViviendas - viviendan.conIrve!) * viviendan.tipo.potencia;
            this.sumPotP1conIrve += (viviendan.conIrve!) * (viviendan.tipo.potencia + 0.3 * viviendan.potIrve!);
            this.sumPotP1 += this.sumPotP1sinIrve + this.sumPotP1conIrve;

          }
          else {
            this.sumPotP1 += viviendan.numViviendas * viviendan.tipo.potencia;

          }
          this.sumvivP1 += viviendan.numViviendas;
          break;
        default:
          this.sumPotP1 += viviendan.numViviendas * viviendan.tipo.potencia;
          this.sumvivP1 += viviendan.numViviendas;

          break;

      }


    });

    if (this.sumvivP1 > 0) {
      if (this.sumvivP1 > 0 && this.sumvivP1 < 22) {
        this.cs = this.tablaITC10[this.sumvivP1 - 1];
      } else if (this.sumvivP1 > 21) {
        this.cs = 15.3 + (this.sumvivP1 - 21) * 0.5;
      }
    } else {
      alert("El número de edificios no es correcto");
      this.valorP1 = 0;
      return 0;
    }

    this.valorP1 = (this.sumPotP1 / this.sumvivP1) * this.cs;

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
        this.valorP5=0;
        this.listaIrve.forEach(irve=>{
          this.valorP5+=irve.cantidad*irve.potencia;
        });
        if(this.spl){
          this.valorP5*0.3;
        }
        return this.valorP5;
    }
  }

  calculaPT(): any {
    
    this.valorP1 = this.calculaP1();
    this.valorP2= this.calculaP2();
    this.valorP3= this.calculaP3();
    this.valorP4= this.calculaP4();
    this.valorP5 = this.calculaP5();
    return this.valorP1 + this.valorP2+this.valorP3+this.valorP4+this.valorP5;

  }

  obtenListaIrve(): IIrve[] {
    return this.listaIrve;
  }

}
function irve(value: IIrve, index: number, array: IIrve[]): void {
  throw new Error('Function not implemented.');
}

