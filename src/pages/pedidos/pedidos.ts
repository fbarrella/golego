import { DateUtils } from './../../utils/date.utils';
import { IdUtils } from './../../utils/id.generator';
import { Pedido } from './../../models/pedido.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  pedidos: Pedido[] = [];
  isUsuario: boolean;
  isLoja: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isUsuario = this.navParams.get("isUsuario");
    this.isLoja = this.navParams.get("isLoja");
    this.pedidos = [
      {
        id: IdUtils.GenerateId(),
        lojaId: "HmSHkH8bvCa89mEgWyHF",
        userId: "KdFvIj20BDXPVk2WlTqgf5is7iz2",
        status: "enviado",
        dataDoPedido: new Date().getTime(),
        itens: [
          {
            id: IdUtils.GenerateId(),
            nome: "Cerveja de Goiaba",
            descricao: "Feita com goiabas frescas",
            preco: 25.0,
            quantidade: 2
          }],
        precoTotal: 50.0,
        enderecoDeEntrega: {
          rua: "rua",
          bairro: "bairro",
          cidade: "cidade",
          estado: "SP",
          cep: "11000-000"
        }
      }
    ];
  }

  ionViewDidLoad() {
    console.log(this.pedidos);
    console.log(this.isUsuario);
    console.log(this.isLoja);
    console.log(IdUtils.GenerateId())
  }

  pushVisualizarPedido(pedido: Pedido) {
    console.log(pedido);
  }

  transformDate(date: number) {
    return DateUtils.UnixToDate(date);
  }

}
