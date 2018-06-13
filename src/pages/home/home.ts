import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public loginService: LoginService) {

  }

  logOut() {
    this.loginService.logout()
  }
}
