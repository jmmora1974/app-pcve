export interface ITipoVivienda {
    id?: number;
    nombre: string;
    descripcion?: string;
    potencia: number;

}

//Ejemplos de uso ....
const tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion:'Vivienda standard',  potencia: 5.75 },
    { id: 2, nombre: 'Elevada', descripcion:'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 3, nombre: 'Contratada',descripcion:'Vivienda con potencia contratada o con tarifa nocturna.',  potencia: 0 }
  ];
  
export interface IVivienda {
    id?:number;
    tipo:  ITipoVivienda;
    numViviendas: number;
    conIrve?: number;
    potIrve?: number;

}
