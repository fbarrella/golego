import { LojaProdutosAdicionarPage } from './../loja-produtos-adicionar/loja-produtos-adicionar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-loja-produtos',
  templateUrl: 'loja-produtos.html',
})
export class LojaProdutosPage {

  produtos = [
    { nome: "Produto 01", id: "123456789", qt: 10 },
    { nome: "Produto 02", id: "223456789", qt: 0 },
    { nome: "Produto 03", id: "323456789", qt: 100 },
    { nome: "Produto 04", id: "423456789", qt: 200 },
    { nome: "Produto 05", id: "523456789", qt: 10 },
    { nome: "Produto 06", id: "623456789", qt: 5 },
    { nome: "Produto 07", id: "723456789", qt: 37 },
  ];

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  pushEditarProduto(produto) {
    console.log(produto)
  }

  pushAddProduto() {
    this.navCtrl.push(LojaProdutosAdicionarPage)
  }

}
