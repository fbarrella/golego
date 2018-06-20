import { Usuario } from './../../models/usuario.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: Usuario = {
    uid: "",
    nome: "João",
    sobrenome: "Silva",
    email: "joaozinho@email.com",
    dataNasc: "01/04/1994",
    avatarUrl: "../../assets/imgs/profile.jpg",
    telefone: "(13)-9999-9999",
    possuiLoja: false,
    endereco: {
      bairro: "bairro",
      cidade: "cidade",
      complemento: "apto 10",
      rua: "rua do centro, 10",
      estado: "SP",
      cep: "11000-000"
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
