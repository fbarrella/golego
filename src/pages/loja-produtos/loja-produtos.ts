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
    { nome: "Bear Premium Lager", prodId: "01", emEstoque: 10, preco: 13.90, descricao: "Lata - 500ml" },
    { nome: "Coopers Original Pale Ale", prodId: "02", emEstoque: 0, preco: 17.90, descricao: "375ml" },
    { nome: "Duvel", prodId: "03", emEstoque: 40, preco: 19.99, descricao: "330 ml" },
    { nome: "Vedett Extra White", prodId: "04", emEstoque: 20, preco: 19.99, descricao: "330 ml" },
    { nome: "Jever Pilsener", prodId: "05", emEstoque: 10, preco: 10.0, descricao: "330 ml" },
    { nome: "Founders Dirty Bastard", prodId: "06", emEstoque: 5, preco: 10.0, descricao: "Garrafa - 355ml" },
    { nome: "Warsteiner Premium", prodId: "07", emEstoque: 37, preco: 10.0, descricao: "330ml" },
  ];

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    let dadosEditados = this.navParams.get('produtoEditado') || null;
    if (dadosEditados != null) {
      let index = this.produtos.findIndex(p => p.prodId == dadosEditados.prodId)
      if (index != -1) {
        this.produtos[index] = dadosEditados;
      }
    }

    let novoProduto = this.navParams.get('novoProduto') || null;
    if (novoProduto != null) {
      this.produtos.push(novoProduto);
    }
  }

  pushEditarProduto(produto) {
    this.navCtrl.push(LojaProdutosEditarPage, { produto: produto });
  }

  pushAddProduto() {
    this.navCtrl.push(LojaProdutosAdicionarPage, { lastId: this.produtos[this.produtos.length - 1].prodId });
  }

}
