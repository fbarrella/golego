import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validacoes } from '../../utils/validators';
import { Usuario } from './../../models/usuario.model';

@IonicPage()
@Component({
  selector: 'page-perfil-editar',
  templateUrl: 'perfil-editar.html',
})
export class PerfilEditarPage {

  dadosDoUsuario = {} as Usuario;
  formEditar: FormGroup;
  siglas: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder) {
    this.dadosDoUsuario = navParams.data;
    this.siglas = Validacoes.siglasDosEstados();
    this.formEditar = this.fb.group({
      nome: this.fb.control(this.dadosDoUsuario.nome, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      sobrenome: this.fb.control(this.dadosDoUsuario.sobrenome, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      telefone: this.fb.control(this.dadosDoUsuario.telefone, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.telefonePattern())])),
      endereco: this.fb.control(this.dadosDoUsuario.endereco.rua, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      complemento: this.fb.control(this.dadosDoUsuario.endereco.complemento),
      bairro: this.fb.control(this.dadosDoUsuario.endereco.bairro, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cidade: this.fb.control(this.dadosDoUsuario.endereco.cidade, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      estado: this.fb.control(this.dadosDoUsuario.endereco.estado, Validators.compose([
        Validators.required, Validators.minLength(2)])),
      cep: this.fb.control(this.dadosDoUsuario.endereco.cep, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.cepPattern())]))
    });
  }

  atualizarUsuario() {
    console.log(this.formEditar.value);
  }

}
