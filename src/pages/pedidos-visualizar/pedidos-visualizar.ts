import { Pedido } from './../../models/pedido.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateUtils } from '../../utils/date.utils';

@IonicPage()
@Component({
  selector: 'page-pedidos-visualizar',
  templateUrl: 'pedidos-visualizar.html',
})
export class PedidosVisualizarPage {

  pedido: Pedido;
  isLoja: boolean = false;
  isUsuario: boolean = false;
  precoTotal: number = 10.0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pedido = navParams.get("pedido");
    this.isLoja = navParams.get("isLoja");
    this.isUsuario = navParams.get("isUsuario");
    this.calculaPrecoTotal();
  }

  ionViewDidLoad() {
    console.log(this.isUsuario);
    console.log(this.pedido);
  }

  ionViewCanEnter() {
    if (this.pedido === null || this.pedido === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  calculaPrecoTotal() {
    for (var index = 0; index < this.pedido.itens.length; index++) {
      let produto = this.pedido.itens[index];
      this.precoTotal += (produto.preco * produto.quantidade);
    }
  }

  transformDate(date: number) {
    return DateUtils.UnixToDate(date);
  }

}
