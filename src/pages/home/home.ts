import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../services/login/login.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut(){
    this.loginService.logout()
  }
}
