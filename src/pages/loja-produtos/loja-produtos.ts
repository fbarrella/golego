import { LojaProdutosEditarPage } from './../loja-produtos-editar/loja-produtos-editar';
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
    { nome: "Produto 01", id: "123456789", emEstoque: 10, preco: 10.0, descricao: "É o produto 01" },
    { nome: "Produto 02", id: "223456789", emEstoque: 0, preco: 10.0, descricao: "É o produto 02" },
    { nome: "Produto 03", id: "323456789", emEstoque: 100, preco: 10.0, descricao: "É o produto 03" },
    { nome: "Produto 04", id: "423456789", emEstoque: 200, preco: 10.0, descricao: "É o produto 04" },
    { nome: "Produto 05", id: "523456789", emEstoque: 10, preco: 10.0, descricao: "É o produto 05" },
    { nome: "Produto 06", id: "623456789", emEstoque: 5, preco: 10.0, descricao: "É o produto 06" },
    { nome: "Produto 07", id: "723456789", emEstoque: 37, preco: 10.0, descricao: "É o produto 07" },
  ];

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  pushEditarProduto(produto) {
    this.navCtrl.push(LojaProdutosEditarPage, { produto: produto });
  }

  pushAddProduto() {
    this.navCtrl.push(LojaProdutosAdicionarPage)
  }

}
