import { LojaPerfilEditarPage } from './../loja-perfil-editar/loja-perfil-editar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loja } from '../../models/loja.model';

@IonicPage()
@Component({
  selector: 'page-loja-perfil',
  templateUrl: 'loja-perfil.html',
})
export class LojaPerfilPage {

  lojaAtiva: Loja = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.lojaAtiva = this.navParams.get("loja");
  }

  ionViewDidLoad() {
  }

  ionViewCanLeave() {
    if (this.lojaAtiva === undefined || this.lojaAtiva === null) {
      return false;
    } else {
      return true;
    }
  }

  pushEditarPerfil() {
    this.navCtrl.push(LojaPerfilEditarPage, { loja: this.lojaAtiva })
  }

}
