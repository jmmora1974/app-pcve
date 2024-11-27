import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, SelectChangeEventDetail } from '@ionic/angular';
import { ITipoVivienda, IVivienda } from 'src/app/models/ivivienda';
import { PrevisionesService } from '../../../services/previsiones.service';
import { IonSelectCustomEvent } from '@ionic/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-moldal-vivienda',
  templateUrl: './moldal-vivienda.page.html',
  styleUrls: ['./moldal-vivienda.page.scss'],
})
export class MoldalViviendaPage implements OnInit {
  previsionesService=inject(PrevisionesService);
   public tipoViviendas: ITipoVivienda[] = [
    { id: 0, nombre: 'Basica', descripcion:'Vivienda standard',  potencia: 5.75 },
    { id: 1, nombre: 'Elevada', descripcion:'Vivienda con dispositivos a alto consumo o de más de 160mts.', potencia: 9.2 },
    { id: 2, nombre: 'Contratada',descripcion:'Vivienda con potencia contratada o con tarifa nocturna.',  potencia: 0 }
  ];
  potenciaViv?: number=5.75;
  numIdVivienda:number=0;
  numeroviviendas: number=0;
  formViviendaM!: FormGroup;
  nuevaVivienda:IVivienda={
    id: 0,
    numViviendas: 0,
    tipo: this.tipoViviendas[0] ,
    conIrve:0,
    potIrve:3.68
   
  }
customOptions:(new () => ITipoVivienda[]) | undefined ;
  
  constructor(
    private modalCtrl: ModalController, 
    public fb: FormBuilder,  
   
    private loadingController: LoadingController,
    private alertController: AlertController,
    private  utilserv: UtilsService,

  ) { 
    
    this.numIdVivienda=this.previsionesService.totalViviendas();
    
  } 
  ngOnInit(): void {
    this.nuevoFormVivienda();
  }

  nuevoFormVivienda(){
     
    this.formViviendaM = this.fb.group({
      id: [this.numIdVivienda],
      numViv:  new FormControl (0, [Validators.required]),
      tipoViv: [this.tipoViviendas[0]],
      potViv: [this.tipoViviendas[0].potencia],
      numVivIrve: [0],
      potIrve: [3.68],
      
    })
  }

  get id() {
    return this.formViviendaM.get('id')?.value;
  }
  get ObtenNumViviendas() {
    return this.formViviendaM.get('numViv')?.value;
  }


  get potTipoVivienda() {
    return this.formViviendaM.get('tipoViv')?.value | 0;
  }

  get ObtenNumViviendasConIrve() {
    return this.formViviendaM.get('numVivIrve')?.value;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

//Funcion agrega vivienda
  agregaVivienda() {  
    if (this.formViviendaM.get('numViv')?.value >0 )  {
      if (this.formViviendaM.get('numViv')?.value <this.formViviendaM.get('numVivIrve')?.value )  {
        this.utilserv.showAlert ("Error numero Irves","El numero de Irves ha de ser inferior o igual a las viviendas.")
      return "";
      }
      this.nuevaVivienda.tipo= this.formViviendaM.get('tipoViv')?.value ;
      if (this.nuevaVivienda.tipo.nombre=="Contratada" ){
        this.nuevaVivienda.tipo.potencia = this.formViviendaM.get('potViv')?.value;
  
      }
      
      this.nuevaVivienda.numViviendas=this.formViviendaM.get('numViv')?.value ;
      this.numIdVivienda!++;
      this.nuevaVivienda.conIrve=this.formViviendaM.get('numVivIrve')?.value ;
      this.nuevaVivienda.potIrve=this.formViviendaM.get('potIrve')?.value ;
      
      return this.modalCtrl.dismiss(this.nuevaVivienda, 'confirm');
    } else {
      this.utilserv.showAlert ("Error numero viviendas","El numero de viviendas ha de ser un número positivo.")
      return "";
    }
    
  }

//Funcion que controla el select de tipo de vivienda
  cambiaTipoVivienda(ev:any) {
    //console.log('Current value:', JSON.stringify(ev.target.value));
    
    this.nuevaVivienda.numViviendas=this.numeroviviendas;
    const tipVivtemp:ITipoVivienda = this.formViviendaM.get('tipoViv')!.value;
    this.potenciaViv =tipVivtemp.potencia;
    //console.log('tipo potencia', JSON.stringify(tipVivtemp));
  }

}
