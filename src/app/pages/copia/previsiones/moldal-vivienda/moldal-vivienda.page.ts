import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSelect, LoadingController, ModalController, NavParams, SelectChangeEventDetail } from '@ionic/angular';
import { ITipoVivienda, IVivienda } from 'src/app/models/ivivienda';
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
import { PrevisionesService } from '../../../services/previsiones.service';
=======
import { ServiPrevisionesService } from '../../../../services/servi-previsiones.service';
import { IonSelectCustomEvent } from '@ionic/core';
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-moldal-vivienda',
  templateUrl: './moldal-vivienda.page.html',
  styleUrls: ['./moldal-vivienda.page.scss'],
})
export class MoldalViviendaPage implements OnInit {
  previsionesService=inject(PrevisionesService);
   public tipoViviendas=this.previsionesService.tipoViviendas;

  potenciaViv?: number=5.75;
  numIdVivienda:number=0;
  numeroviviendas: number=0;
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
  formViviendaM!: FormGroup;
=======
  formViviendao!: FormGroup;
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
  nuevaVivienda:IVivienda={
    id: 0,
    numViviendas: 0,
    tipo: this.tipoViviendas[0] ,
    conIrve:0,
    potIrve:3.68,
    medidaPotIrve:'kW'
   
  }
customOptions:(new () => ITipoVivienda[]) | undefined ;
  
  constructor(
    private modalCtrl: ModalController, 
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    public fb: FormBuilder,  
   
=======
    public fb: FormBuilder,navParams: NavParams,  
    PrevisionesService1 : ServiPrevisionesService,
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    private loadingController: LoadingController,
    private alertController: AlertController,
    private  utilserv: UtilsService,

  ) { 
    
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    this.numIdVivienda=this.previsionesService.totalViviendas();
=======
    this.numIdVivienda=PrevisionesService1.totalViviendas();
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    
  } 
  ngOnInit(): void {
    this.nuevoFormVivienda();
  }

  nuevoFormVivienda(){
     
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    this.formViviendaM = this.fb.group({
=======
    this.formViviendao = this.fb.group({
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
      id: [this.numIdVivienda],
      numViv:  new FormControl (0, [Validators.required]),
      tipoViv: [this.tipoViviendas[0]],
      potViv: new FormControl({value: this.tipoViviendas[0].potencia, disabled: true}, Validators.required),
      numVivIrve: [0],
      potIrve: [3.68],
      
    })
  }

  get id() {
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    return this.formViviendaM.get('id')?.value;
  }
  get ObtenNumViviendas() {
    return this.formViviendaM.get('numViv')?.value;
  }


  get medidaTipoVivienda() {
    return this.formViviendaM.get('tipoViv.medidaPotVivienda')?.value | 0;
=======
    return this.formViviendao.get('id')?.value;
  }
  get ObtenNumViviendas() {
    return this.formViviendao.get('numViv')?.value;
  }


  get potTipoVivienda() {
    return this.formViviendao.get('tipoViv')?.value | 0;
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
  }

  get tipoVivienda() {
    return this.formViviendaM.get('tipoViv')?.value | 0;
  }

 
  get ObtenNumViviendasConIrve() {
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    return this.formViviendaM.get('numVivIrve')?.value;
=======
    return this.formViviendao.get('numVivIrve')?.value;
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

//Funcion agrega vivienda
  agregaVivienda() {  
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    if (this.formViviendaM.get('numViv')?.value >0 )  {
      if (this.formViviendaM.get('numViv')?.value <this.formViviendaM.get('numVivIrve')?.value )  {
        this.utilserv.showAlert ("Error numero Irves","El numero de Irves ha de ser inferior o igual a las viviendas.")
      return "";
      }
      this.nuevaVivienda.tipo= this.formViviendaM.get('tipoViv')?.value ;
      if (this.nuevaVivienda.tipo.nombre=="Contratada" ){
        this.nuevaVivienda.tipo.potencia = this.formViviendaM.get('potViv')?.value;
        if(this.nuevaVivienda.tipo.potencia==0 || this.nuevaVivienda.tipo.potencia ==undefined ){
          this.utilserv.showAlert ("Error potencia vivienda","La potencia de la vivienda contrada ha de ser un número positivo.")
      return "";
        }
  
      }
      
      this.nuevaVivienda.numViviendas=this.formViviendaM.get('numViv')?.value ;
      this.numIdVivienda!++;
      this.nuevaVivienda.conIrve=this.formViviendaM.get('numVivIrve')?.value ;
      this.nuevaVivienda.potIrve=this.formViviendaM.get('potIrve')?.value ;

      console.log("this.nuevaVivienda.tipo.medidaPotVivienda?", this.nuevaVivienda.tipo.medidaPotVivienda);

      //Comprobamos si las potencias esta en Watios para pasarlos a KW
      if (this.nuevaVivienda.tipo.medidaPotVivienda?.toUpperCase()=='W'){
        this.nuevaVivienda.tipo.potencia!/=1000;
        this.nuevaVivienda.tipo.medidaPotVivienda='kW';
        console.log("med potvic era W y se ha pasado a kW");
      }

      //Comprobamos si las potencias esta en Watios para pasarlos a KW
      if (this.nuevaVivienda.medidaPotIrve=='W'){
        this.nuevaVivienda.potIrve!/=1000;
        this.nuevaVivienda.medidaPotIrve='kW';
        console.log("med pot irve era W y se ha pasado a kW");
      }


=======
    if (this.formViviendao.get('numViv')?.value >0 )  {
      if (this.formViviendao.get('numViv')?.value <this.formViviendao.get('numVivIrve')?.value )  {
        this.utilserv.showAlert ("Error numero Irves","El numero de Irves ha de ser inferior o igual a las viviendas.")
      return "";
      }
      this.nuevaVivienda.tipo= this.formViviendao.get('tipoViv')?.value ;
      if (this.nuevaVivienda.tipo.nombre=="Contratada" ){
        this.nuevaVivienda.tipo.potencia = this.formViviendao.get('potViv')?.value;
  
      }
      
      this.nuevaVivienda.numViviendas=this.formViviendao.get('numViv')?.value ;
      this.numIdVivienda!++;
      this.nuevaVivienda.conIrve=this.formViviendao.get('numVivIrve')?.value ;
      this.nuevaVivienda.potIrve=this.formViviendao.get('potIrve')?.value ;
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
      
      return this.modalCtrl.dismiss(this.nuevaVivienda, 'confirm');
    } else {
      this.utilserv.showAlert ("Error numero viviendas","El numero de viviendas ha de ser un número positivo.")
      return "";
    }
    
  }

//Funcion que controla el select de tipo de vivienda
  cambiaTipoVivienda(ev:any) {
    console.log('Current cambio tipo vivienda:', JSON.stringify(ev.value));
    
    this.nuevaVivienda.numViviendas=this.numeroviviendas;
<<<<<<< HEAD:src/app/pages/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    const tipVivtemp:ITipoVivienda = this.formViviendaM.get('tipoViv')!.value;
=======
    const tipVivtemp:ITipoVivienda = this.formViviendao.get('tipoViv')!.value;
>>>>>>> a6f1fb9 ( Changes to be committed:):src/app/pages/copia/previsiones/moldal-vivienda/moldal-vivienda.page.ts
    this.potenciaViv =tipVivtemp.potencia;
    
   // console.log('tipo potencia', JSON.stringify(tipVivtemp));

    const potVivienda = document.getElementById("txtPotVivienda");
    const medidaVivienda= document.getElementById("selMedidaPotenciaVivienda") as HTMLIonSelectElement;

    potVivienda!.setAttribute("disabled", "true");
    medidaVivienda.setAttribute('disabled', 'true');
       
    potVivienda?.setAttribute('readonly', 'true');
    medidaVivienda.setAttribute('readonly', 'true');
   
    document.getElementById("selMedidaPotenciaVivienda")?.setAttribute('value', 'kW');
    switch (tipVivtemp.nombre) {
      case "Basica":
        this.potenciaViv = tipVivtemp.potencia;
        return this.potenciaViv;
      case "Elevada":
        this.potenciaViv =tipVivtemp.potencia;
        return this.potenciaViv;
      
      default:
        this.potenciaViv =0;
        potVivienda?.removeAttribute('readonly');
        potVivienda?.setAttribute("disabled", "false");
        medidaVivienda.removeAttribute('readonly');
        medidaVivienda?.setAttribute("disabled", "false");
        return "0"; 
    }

  }

  cambiaTipoMedidaIrve(medIrve:string='kW'){
    this.nuevaVivienda.medidaPotIrve=medIrve;
    console.log('cambiaTipoMedidaIrve',medIrve)
  }

  cambiaTipoMedidaVivienda(medViv:string='kw'){
    this.nuevaVivienda.tipo.medidaPotVivienda=medViv;
   
    const vivTemp:ITipoVivienda = this.formViviendaM.get('tipoViv')!.value;

    vivTemp.medidaPotVivienda=medViv;
    this.formViviendaM.get('tipoViv')?.setValue(vivTemp);
    console.log('cambiaTipoMedidaViv',vivTemp);
  }
  

}
function tmedidaTipoVivienda() {
  throw new Error('Function not implemented.');
}

