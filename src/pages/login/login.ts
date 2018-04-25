import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

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
    public navParams: NavParams, 
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {

      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      })
  }

  pushCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  logIn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;
      this.loginService.login(email, senha)
        .then(resp => this.navCtrl.setRoot(HomePage))
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

  logForm(){
    console.log(this.loginForm.value)
  }
}
