import { ForgotPasswdPage } from './../forgot-passwd/forgot-passwd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { LoginService } from '../../providers/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //A FormGroup aggregates the values of each child FormControl into one object, with each control name as the key. 
  //It calculates its status by reducing the statuses of its children. 
  //For example, if one of the controls in a group is invalid, the entire group becomes invalid.

  private loginForm: FormGroup

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  pushCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  forgotPass(){
    this.navCtrl.push(ForgotPasswdPage);
  }

  logIn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;
      this.loginService.login(email, senha)
        .catch(err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: "Erro ao realizar o login",
            subTitle: err.message,
            buttons: ['Dismiss']
          });

          alert.present();
        });
    }

  }

  logForm() {
    console.log(this.loginForm.value)
  }
}
