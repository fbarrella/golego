import { PagamentoPage } from './../pages/pagamento/pagamento';
import { DirectivesModule } from './../directives/directives.module';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore"
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LoginService } from "../providers/login/login.service";
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { CompraPage } from '../pages/compra/compra';
import { DetalhesProdutoPage } from './../pages/detalhes-produto/detalhes-produto';
import { LojaPage } from './../pages/loja/loja';
import { LojaProdutosPage } from './../pages/loja-produtos/loja-produtos';
import { LojaPerfilEditarPage } from './../pages/loja-perfil-editar/loja-perfil-editar';
import { LojaPerfilPage } from './../pages/loja-perfil/loja-perfil';
import { PedidosVisualizarPage } from './../pages/pedidos-visualizar/pedidos-visualizar';
import { LojaProdutosEditarPage } from './../pages/loja-produtos-editar/loja-produtos-editar';
import { LojaProdutosAdicionarPage } from './../pages/loja-produtos-adicionar/loja-produtos-adicionar';
import { LojaCadastroPage } from './../pages/loja-cadastro/loja-cadastro';
import { CatalogoPage } from './../pages/catalogo/catalogo';
import { PedidosPage } from './../pages/pedidos/pedidos';
import { PesquisaProdutoPage } from './../pages/pesquisa-produto/pesquisa-produto';
import { PesquisaLojaPage } from './../pages/pesquisa-loja/pesquisa-loja';
import { PerfilPage } from './../pages/perfil/perfil';
import { PerfilEditarPage } from './../pages/perfil-editar/perfil-editar';
import { CustomHeaderComponent } from './../components/custom-header/custom-header';

import { FIREBASE_CONFIG } from "./firebase.credentials";
import { LojaService } from '../providers/loja/loja.service';
import { ProdutoService } from '../providers/produto/produto.service';
import { DecimalPipe } from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    CompraPage,
    DetalhesProdutoPage,
    PerfilPage,
    PerfilEditarPage,
    PedidosPage,
    PedidosVisualizarPage,
    PesquisaLojaPage,
    PesquisaProdutoPage,
    CatalogoPage,
    LojaPage,
    LojaCadastroPage,
    LojaPerfilPage,
    LojaPerfilEditarPage,
    LojaProdutosPage,
    LojaProdutosAdicionarPage,
    LojaProdutosEditarPage,
    CustomHeaderComponent,
    PagamentoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    CompraPage,
    DetalhesProdutoPage,
    PerfilPage,
    PerfilEditarPage,
    PedidosPage,
    PedidosVisualizarPage,
    PesquisaLojaPage,
    PesquisaProdutoPage,
    CatalogoPage,
    LojaPage,
    LojaCadastroPage,
    LojaPerfilPage,
    LojaPerfilEditarPage,
    LojaProdutosPage,
    LojaProdutosAdicionarPage,
    LojaProdutosEditarPage,
    PagamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    LojaService,
    FileChooser,
    ProdutoService,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DecimalPipe
  ]
})
export class AppModule { }
