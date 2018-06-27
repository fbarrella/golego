import { LojaService } from './../../providers/loja/loja.service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { paginaInterface } from '../../app/app.component';
import { LojaPerfilPage } from '../loja-perfil/loja-perfil';
import { LojaPedidosPage } from '../loja-pedidos/loja-pedidos';
import { LojaProdutosPage } from '../loja-produtos/loja-produtos';

@IonicPage()
@Component({
  selector: 'page-loja',
  templateUrl: 'loja.html',
})
export class LojaPage {

  paginas: paginaInterface[] = [
    { titulo: "Perfil da Loja", nome: "PerfilPage", componente: LojaPerfilPage, icone: "basket" },
    { titulo: "Pedidos", nome: "PedidosPage", componente: LojaPedidosPage, icone: "cube" },
    { titulo: "Produtos", nome: "CatalogoPage", componente: LojaProdutosPage, icone: "cart" },
    { titulo: "Menu Principal", nome: "LojaPage", componente: HomePage, icone: "logo-usd" }
  ]

  donoId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lojaService: LojaService) {
    this.donoId = navParams.get("donoId");
  }

  abrirPagina(pagina: paginaInterface) {
    this.navCtrl.push(pagina.componente, { donoId: this.donoId });
  }

}
