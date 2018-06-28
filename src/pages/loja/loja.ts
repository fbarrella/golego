import { PedidosPage } from './../pedidos/pedidos';
import { LojaService } from './../../providers/loja/loja.service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { paginaInterface } from '../../app/app.component';
import { LojaPerfilPage } from '../loja-perfil/loja-perfil';
import { LojaProdutosPage } from '../loja-produtos/loja-produtos';
import { Loja } from '../../models/loja.model';

@IonicPage()
@Component({
  selector: 'page-loja',
  templateUrl: 'loja.html',
})
export class LojaPage {

  paginas: paginaInterface[] = [
    { titulo: "Perfil da Loja", nome: "PerfilPage", componente: LojaPerfilPage, icone: "basket" },
    { titulo: "Pedidos", nome: "PedidosPage", componente: PedidosPage, icone: "cube" },
    { titulo: "Produtos", nome: "CatalogoPage", componente: LojaProdutosPage, icone: "cart" }
  ]

  lojaId: string;
  lojaAtiva: Loja;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lojaService: LojaService) {
    this.lojaId = navParams.get("lojaId");
  }

  ionViewDidLoad() {
    this.lojaService.buscarLojaAtiva(this.lojaId).then(async loja => {
      this.lojaAtiva = await loja.data() as Loja;
      console.log(this.lojaAtiva);
    })
  }


  abrirPagina(pagina: paginaInterface) {
    this.navCtrl.push(pagina.componente, { loja: this.lojaAtiva, isLoja: true });
  }

  backMenu() {
    this.navCtrl.setRoot(HomePage);
  }

}
