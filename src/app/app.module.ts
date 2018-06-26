import { DirectivesModule } from './../directives/directives.module';
import { LojaCadastroPage } from './../pages/loja-cadastro/loja-cadastro';
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

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { LojaPage } from './../pages/loja/loja';
import { CatalogoPage } from './../pages/catalogo/catalogo';
import { PedidosPage } from './../pages/pedidos/pedidos';
import { PerfilPage } from './../pages/perfil/perfil';
import { PerfilEditarPage } from './../pages/perfil-editar/perfil-editar';
import { CustomHeaderComponent } from './../components/custom-header/custom-header';

import { FIREBASE_CONFIG } from "./firebase.credentials";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    PerfilEditarPage,
    PedidosPage,
    CatalogoPage,
    LojaPage,
    LojaCadastroPage,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
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
    PerfilPage,
    PerfilEditarPage,
    PedidosPage,
    CatalogoPage,
    LojaPage,
    LojaCadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    FileChooser,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
