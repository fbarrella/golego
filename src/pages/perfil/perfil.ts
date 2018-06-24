import { PerfilEditarPage } from './../perfil-editar/perfil-editar';
import { LoginService } from './../../providers/login/login.service';
import { Usuario } from './../../models/usuario.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario = {} as Usuario

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService) {
    this.usuario = loginService.usuarioLogado;
  }

  pushEditarPerfil() {
    this.navCtrl.push(PerfilEditarPage, this.usuario)
  }

}
