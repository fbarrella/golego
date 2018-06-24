import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';
import { paginaInterface } from '../../app/app.component';
import { PerfilPage } from '../perfil/perfil';
import { PedidosPage } from '../pedidos/pedidos';
import { CatalogoPage } from '../catalogo/catalogo';
import { LojaPage } from '../loja/loja';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  paginas: paginaInterface[] = [
    { titulo: "Meu Perfil", nome: "PerfilPage", componente: PerfilPage, icone: "contact" },
    { titulo: "Meus Pedidos", nome: "PedidosPage", componente: PedidosPage, icone: "cube" },
    { titulo: "Nova Compra", nome: "CatalogoPage", componente: CatalogoPage, icone: "cart" },
    { titulo: "Minha Loja", nome: "LojaPage", componente: LojaPage, icone: "logo-usd" }
  ]

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public loginService: LoginService) {
  }

  logOut() {
    this.loginService.logout()
  }

  abrirPagina(pagina: paginaInterface) {
    this.navCtrl.push(pagina.componente);
  }


}
