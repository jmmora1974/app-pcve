import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private alertController: AlertController) { }

  showElementByPlatform(plugin: string) {
    // console.log(Capacitor.getPlatform());
    // console.log(Capacitor.isPluginAvailable(plugin));
    // console.log(Capacitor.isNativePlatform());
    return Capacitor.isNativePlatform();
  }

  async showAlert(header: string, message: string, func: any = null) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: [{
				text: 'OK',
				handler: () => {
				  alert.dismiss().then(func);
			}}]
		});
		await alert.present();
	}

}