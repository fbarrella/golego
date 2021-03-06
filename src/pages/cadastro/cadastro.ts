import { Validacoes } from './../../utils/validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';

import { LoginService } from '../../providers/login/login.service';
import { Usuario } from './../../models/usuario.model';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private cadastroForm: FormGroup;
  public nascimento: string = "";
  public siglas = Validacoes.siglasDosEstados();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      sobrenome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      telefone: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(Validacoes.telefonePattern())])),
      email: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(Validacoes.emailPattern())])),
      senha: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(6)])),
      senha2: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(6)])),
      endereco: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cidade: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      estado: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(2)])),
      cep: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(Validacoes.cepPattern())]))
    }, { validator: Validacoes.validaSenha });
  }



  get nome() {
    return this.cadastroForm.get("nome").value;
  }

  get sobrenome() {
    return this.cadastroForm.get("sobrenome").value;
  }

  get telefone() {
    return this.cadastroForm.get("telefone").value;
  }

  get email() {
    return this.cadastroForm.get("email").value;
  }

  get senha() {
    return this.cadastroForm.get("senha").value;
  }

  get endereco() {
    return this.cadastroForm.get("endereco").value;
  }

  get complemento() {
    return this.cadastroForm.get("complemento").value;
  }

  get bairro() {
    return this.cadastroForm.get("bairro").value;
  }

  get cidade() {
    return this.cadastroForm.get("cidade").value;
  }

  get estado() {
    return this.cadastroForm.get("estado").value;
  }

  get cep() {
    return this.cadastroForm.get("cep").value;
  }


  async criarUsuario(): Promise<any> {
    if (!this.cadastroForm.valid || this.nascimento === "") {
      let alerta: Alert = this.alertCtrl.create({
        message: "O formulário está inválido!",
        buttons: ['Dismiss']
      });
      alerta.present();
    }
    else {
      let carregamento: Loading;
      carregamento = this.loadingCtrl.create();
      carregamento.present();
      const email: string = this.email;
      const senha: string = this.senha;
      const usuario: Usuario = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        dataNasc: this.nascimento,
        telefone: this.telefone,
        endereco: {
          bairro: this.bairro,
          cidade: this.cidade,
          complemento: this.complemento,
          rua: this.endereco,
          estado: this.estado,
          cep: this.cep
        }
      };
      try {
        await this.loginService.criarUsuario(email, senha, usuario);
        await carregamento.dismiss();
      } catch (error) {
        await carregamento.dismiss();
        let alerta: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        alerta.present();
      }
    }

  }
}
