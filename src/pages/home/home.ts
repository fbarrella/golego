import { LojaPage } from './../loja/loja';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';
import { paginaInterface } from '../../app/app.component';
import { PerfilPage } from '../perfil/perfil';
import { PedidosPage } from '../pedidos/pedidos';
import { CatalogoPage } from '../catalogo/catalogo';
import { LojaCadastroPage } from '../loja-cadastro/loja-cadastro';

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
    private alertCtrl: AlertController,
    private loginService: LoginService) {
  }

  logOut() {
    this.loginService.logout()
  }

  abrirPagina(pagina: paginaInterface) {
    const usuarioLogado = this.loginService.usuarioLogado;
    switch (String(pagina.nome)) {
      case "LojaPage":
        if (!(usuarioLogado.emailVerificado)) {
          let alertaEmail = this.alertCtrl.create({
            title: 'Email não verificado',
            message: 'Você precisa confirmar seu endereço de e-mail para ser habilitado a criar uma loja. Confira sua caixa de e-mails.',
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alertaEmail.present();
          break;
        }

        if ((!usuarioLogado.possuiLoja)) {
          let alertaLoja = this.alertCtrl.create({
            title: 'Deseja criar uma loja?',
            message: 'Detectamos que você ainda não possui nenhuma loja criada. Para continuar, seria necessário a criação de uma',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel'
              },
              {
                text: 'Criar',
                handler: () => {
                  this.navCtrl.push(LojaCadastroPage)
                }
              }
            ]
          });
          alertaLoja.present();
        }
        else {
          this.navCtrl.push(pagina.componente);
        }
        break;
      default:
        this.navCtrl.push(pagina.componente);
        break;
    }


  }


}
