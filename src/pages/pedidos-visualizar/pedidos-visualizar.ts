import { Usuario } from './../../models/usuario.model';
import { Pedido } from './../../models/pedido.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateUtils } from '../../utils/date.utils';
import firebase from 'firebase/app';

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
  cliente: Usuario;
  private db: firebase.firestore.Firestore;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pedido = navParams.get("pedido");
    this.isLoja = navParams.get("isLoja");
    this.isUsuario = navParams.get("isUsuario");
    this.calculaPrecoTotal();
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true })
    if (this.isLoja) {
      this.buscarInfoDoCliente(this.pedido.userId).then(
        cliente => {
          console.log(cliente);
          this.cliente = cliente as Usuario;
        }
      );
    }
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

  async buscarInfoDoCliente(clienteId: string) {
    try {
      const clienteRef: firebase.firestore.DocumentSnapshot =
        await this.db
          .doc(`user/${clienteId}`)
          .get();

      let dados = clienteRef.data();

      return {
        uid: dados.uid,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        email: dados.email,
        emailVerificado: dados.emailVerified,
        dataNasc: dados.dataNasc,
        avatarUrl: dados.avatarUrl,
        telefone: dados.telefone,
        possuiLoja: dados.possuiLoja,
        lojaId: dados.lojaId,
        endereco: dados.endereco
      }
    } catch (error) {
      throw error();
    }
  }

  confirmarRecebimento() {

  }

  avancarStatus(pedido: Pedido) {
    switch (String(pedido.status)) {
      case "aguardando envio":
        pedido.status = "enviado";
        break;
      case "processado":
        pedido.status = "enviado";
        break;
      case "enviado":
        pedido.status = "concluido";
      default:
        break;
    }
  }
}

