export interface IAlumbrado {
    id:number;
    mtsAlumbrado?:number;
    tipoAlumbrado?: ITiposAlumbrado;
    numLamparas?:number;
    potLamparas?:number;
    medidaPotencia?:string;
    lampFluorescente?:boolean;
    totalPotenciaAlumkW:number;
}

export interface ITiposAlumbrado {
    nombreAlum: string;
    potAlum:number;
}

