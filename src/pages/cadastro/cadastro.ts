import { Usuario } from './../../models/usuario.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { LoginService } from '../../providers/login/login.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private cadastroForm: FormGroup;
  public nascimento: string = "";
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  telefonePattern = /^\([1-9]{2}\)\s?(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      sobrenome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      telefone: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(this.telefonePattern)])),
      email: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(this.emailPattern)])),
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
      cep: this.formBuilder.control('', Validators.compose([Validators.required]))
    }, { validator: CadastroPage.validaSenha });
  }

  static validaSenha(group: AbstractControl): { [key: string]: boolean } {
    const senha = group.get('senha')
    const senhaConfirmacao = group.get('senha2')
    if (!senha || !senhaConfirmacao) {
      return undefined
    }
    if (senha.value !== senhaConfirmacao.value) {
      return { senhaNaoConfere: true }
    }
    return undefined
  }

  async criarUsuario(): Promise<any> {
    console.log(this.cadastroForm)
    if (!this.cadastroForm.valid || this.nascimento === "") {
      let alerta: Alert = this.alertCtrl.create({
        message: "O formulário está inválido!",
        buttons: ['Dismiss']
      });
      alerta.present();
    }
    else {
      console.log(this.cadastroForm.value);
      let carregamento: Loading;
      carregamento = this.loadingCtrl.create();
      carregamento.present();
      const email: string = this.cadastroForm.get("email").value;
      const senha: string = this.cadastroForm.get("senha").value;
      const usuario: Usuario = {
        nome: this.cadastroForm.get("nome").value,
        sobrenome: this.cadastroForm.get("sobrenome").value,
        dataNasc: this.nascimento,
        telefone: this.cadastroForm.get("telefone").value,
        endereco: {
          bairro: this.cadastroForm.get("bairro").value,
          cidade: this.cadastroForm.get("cidade").value,
          complemento: this.cadastroForm.get("complemento").value,
          rua: this.cadastroForm.get("endereco").value,
          estado: this.cadastroForm.get("estado").value,
          cep: this.cadastroForm.get("cep").value
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
