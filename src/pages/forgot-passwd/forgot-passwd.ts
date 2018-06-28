import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-forgot-passwd',
  templateUrl: 'forgot-passwd.html',
})
export class ForgotPasswdPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toast: ToastController
            ) {

  }

  backLogin(){
    this.toast.create({
      message: 'Link pra recuperação enviado!',
      duration: 3000,
      position: 'bottom'
    }).present();
    this.navCtrl.setRoot(LoginPage);
  }

}
