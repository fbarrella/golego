import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private cadastroForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public formBuilder: FormBuilder) {
    this.cadastroForm = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      nascimento: [''],
      telefone: [''],
      email: [''],
      senha: [''],
      senha2: [''],
      endereco: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      cep: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  criarUsuario() {
    this.loginService.criarUsuario();
    this.navCtrl.pop();
  }
}
