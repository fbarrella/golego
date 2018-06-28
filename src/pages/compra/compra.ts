import { PagamentoPage } from './../pagamento/pagamento';
import { HomePage } from './../home/home';
import { PesquisaProdutoPage } from './../pesquisa-produto/pesquisa-produto';
import { Produto } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {

  carrinho: Produto[] = [];
  preco: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carrinho = this.navParams.get('arrayCarr');
    this.carrinho.push(this.navParams.get('produto'));
    this.carrinho.forEach((obj) => obj.qtde = 1);
    this.preco = this.updatePreco();
    console.log(this.carrinho);
  }

  addProduto() {
    this.navCtrl.push(PesquisaProdutoPage, {
      arrayNovo: this.carrinho
    });
  }

  cancelar() {
    this.navCtrl.setRoot(HomePage);
  }

  updatePreco(): number {
    let p: number = 0;
    for (let i = 0; i < this.carrinho.length; i++) {
      p += (this.carrinho[i].qtde * this.carrinho[i].preco);
    }

    return p;
  }

  adicionarQtde(produtoId: string) {
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i].prodId == produtoId) {
        this.carrinho[i].qtde++;
      }
    }

    this.preco = this.updatePreco();
  }

  reduzirQtde(produtoId: string) {
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i].prodId == produtoId) {
        if (this.carrinho[i].qtde > 0) {
          this.carrinho[i].qtde--;
        }
      }
    }

    this.preco = this.updatePreco();
  }

  finalizarPedido() {
    this.navCtrl.push(PagamentoPage, { valor: this.preco });
  }

}
