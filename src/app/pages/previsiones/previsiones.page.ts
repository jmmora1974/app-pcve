import { Component, ElementRef, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ITipoVivienda, IVivienda } from 'src/app/models/ivivienda';

@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.page.html',
  styleUrls: ['./previsiones.page.scss'],
})

export class PrevisionesPage implements OnInit {
potViv: any;
public viviendas: WritableSignal<IVivienda[]> = signal<IVivienda[]>([]);
agregaVivienda() {
throw new Error('Method not implemented.');
}

  viviendasForm!: FormGroup;

  public tipoViviendas: ITipoVivienda[] = [
    { id: 1, nombre: 'Basica', descripcion: 'Vivienda standard', potencia: 5750 },
    { id: 2, nombre: 'Elevada', descripcion: 'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9200 },
    { id: 3, nombre: 'Contratada', descripcion: 'Vivienda con potencia contratada o con tarifa nocturna.', potencia: 0 }
  ];
  numViv: number = 0;
 
  cambiaPotencia(eve:any) {
    let valorPot = document.getElementById("potViv") as HTMLIonInputElement;
    let tipoViv = document.getElementById("selTipoVivi") as HTMLIonSelectElement;
    console.log("valor",eve, "ipo ",tipoViv.value);
    switch (tipoViv.value) {
      case this.tipoViviendas[0].nombre:
        valorPot.style.color="green";
        valorPot.value = this.tipoViviendas[0].potencia;
        valorPot.readonly=true;
        break;
      case this.tipoViviendas[1].nombre:
        valorPot.style.color="green";
        valorPot.value = this.tipoViviendas[1].potencia;
        valorPot.readonly=true;
        break;

      default:
        valorPot.value = 0;
        valorPot.readonly=false;
        valorPot.style.color="red";
        break;
    }
    
  }
  cambiaColorNumero(arg0: any) {
    console.log("numero :", JSON.stringify(arg0));
}
  cambiaEsquema(arg0: EventTarget | null) {
    throw new Error('Method not implemented.');
  }
  cambiaSPL(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  selTipoVivienda!: string;
  obtenTipoVivienda() {

    for (let x = 0; x < this.tipoViviendas.length; x++) {
      //this.selTipoVivienda = new Option(this.tipoViviendas[x]);
    }
  }

  agregarVivienda() {
    let numVivElem = document.getElementById("numViv") as HTMLInputElement;
    let potVivElem = document.getElementById("potViv") as HTMLInputElement;
    let tipoViv = document.getElementById("selTipoVivi") as HTMLIonSelectElement;
    //Comprobamos que los valores son numeros positivos 
    let valorNumViv =  parseInt( numVivElem.value);
    if (valorNumViv<1){
      alert("El número de viviendas ha de ser posistivo");
    }

    let valorPot =  parseInt( potVivElem.value);
    console.log(tipoViv.value)
    if (valorPot<5750){
      alert("La potencia ha de ser superior a 5750 W.");
    }
    
    let tipoVivNueva= {nombre: tipoViv.value, potencia: valorPot } as ITipoVivienda;
     let nuevaVivienda = {
          id:this.viviendas.length, 
          tipo: tipoVivNueva,
          numViviendas: valorNumViv
         } ;
    this.viviendas.update (values => [...values,nuevaVivienda]);

  }
  constructor(public fb: FormBuilder) { }

  ngOnInit() {

    document.getElementById("selTipoVivi") as HTMLIonSelectElement;

    this.viviendasForm = this.fb.group({

      numViv: [0, [Validators.required]],

      potViv: [5750],


    })
  }

}
