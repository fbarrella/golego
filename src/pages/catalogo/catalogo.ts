import { PesquisaProdutoPage } from './../pesquisa-produto/pesquisa-produto';
import { PesquisaLojaPage } from './../pesquisa-loja/pesquisa-loja';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoPage');
  }

  setLoja(){
    this.navCtrl.push(PesquisaLojaPage);
  }

  setProduto(){
    this.navCtrl.push(PesquisaProdutoPage);
  }

}
