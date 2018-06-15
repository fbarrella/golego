import { LojaPage } from './../pages/loja/loja';
import { CatalogoPage } from './../pages/catalogo/catalogo';
import { PedidosPage } from './../pages/pedidos/pedidos';
import { PerfilPage } from './../pages/perfil/perfil';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore"
import { LoginService } from "../providers/login/login.service";


import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { CadastroPage } from "../pages/cadastro/cadastro";

import { FIREBASE_CONFIG } from "./firebase.credentials";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    PedidosPage,
    CatalogoPage,
    LojaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    PedidosPage,
    CatalogoPage,
    LojaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
