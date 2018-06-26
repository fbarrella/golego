import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validacoes } from '../../utils/validators';


@IonicPage()
@Component({
  selector: 'page-loja-cadastro',
  templateUrl: 'loja-cadastro.html',
})
export class LojaCadastroPage {
  criacaoForm: FormGroup;
  siglas: string[] = Validacoes.siglasDosEstados();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.criacaoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      documento: this.formBuilder.control('', Validators.compose([
        Validators.required])),
      telefone: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(Validacoes.telefonePattern())])),
      email: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.pattern(Validacoes.emailPattern())])),
      website: this.formBuilder.control(''),
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
    }, { validator: Validacoes.validaCNPJ });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LojaCadastroPage');
  }

  get nome() {
    return this.criacaoForm.get("nome").value;
  }

  get documento() {
    return this.criacaoForm.get("documento").value;
  }

  get telefone() {
    return this.criacaoForm.get("telefone").value;
  }

  get email() {
    return this.criacaoForm.get("email").value;
  }

  get website() {
    return this.criacaoForm.get("website").value;
  }

  get endereco() {
    return this.criacaoForm.get("endereco").value;
  }

  get complemento() {
    return this.criacaoForm.get("complemento").value;
  }

  get bairro() {
    return this.criacaoForm.get("bairro").value;
  }

  get cidade() {
    return this.criacaoForm.get("cidade").value;
  }

  get estado() {
    return this.criacaoForm.get("estado").value;
  }

  get cep() {
    return this.criacaoForm.get("cep").value;
  }

  criarLoja() {
    console.log(this.criacaoForm.value);
    console.log(this.criacaoForm);
  }

}
