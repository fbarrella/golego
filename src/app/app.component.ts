import { LojaPage } from './../pages/loja/loja';
import { CatalogoPage } from './../pages/catalogo/catalogo';
import { PedidosPage } from './../pages/pedidos/pedidos';
import { PerfilPage } from './../pages/perfil/perfil';
import { LoginPage } from './../pages/login/login';
import { LoginService } from './../providers/login/login.service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';

export interface paginaInterface {
  titulo: string;
  nome: string;
  componente: any;
  icone: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) private nav: Nav;

  paginas: paginaInterface[] = [
    { titulo: "Tela Principal", nome: "HomePage", componente: HomePage, icone: "home" },
    { titulo: "Meu Perfil", nome: "PerfilPage", componente: PerfilPage, icone: "contact" },
    { titulo: "Meus Pedidos", nome: "PedidosPage", componente: PedidosPage, icone: "cube" },
    { titulo: "Nova Compra", nome: "CatalogoPage", componente: CatalogoPage, icone: "cart" },
    { titulo: "Minha Loja", nome: "LojaPage", componente: LojaPage, icone: "logo-usd" }
  ]

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public loginService: LoginService) {
    afAuth.authState.subscribe(usuario => {
      console.log(usuario)
      if (usuario) {
        this.loginService.setLoggedUser(usuario);
        this.rootPage = HomePage;
      } else {
        this.loginService.clearLoggedUser();
        this.rootPage = LoginPage;
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina: paginaInterface) {
    this.nav.setRoot(pagina.componente);
  }

  estaAtiva(pagina: paginaInterface) {
    if (this.nav.getActive() && this.nav.getActive().name === pagina.nome) {
      return 'primary';
    }
    return;
  }

  sair() {
    this.loginService.logout()
  }
}
