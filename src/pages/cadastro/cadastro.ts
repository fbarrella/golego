import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  telefonePattern = /^\([1-9]{2}\)\s?(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public formBuilder: FormBuilder) {
    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      sobrenome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      nascimento: this.formBuilder.control('', Validators.compose([
        Validators.required])),
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

  criarUsuario() {
    console.log(this.cadastroForm.value);
    this.loginService.criarUsuario();
    this.navCtrl.pop();
  }
}
