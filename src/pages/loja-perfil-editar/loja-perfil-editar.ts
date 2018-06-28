import { LojaPage } from './../loja/loja';
import { HomePage } from './../home/home';
import { Loja } from './../../models/loja.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, Alert } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Validacoes } from '../../utils/validators';

@IonicPage()
@Component({
  selector: 'page-loja-perfil-editar',
  templateUrl: 'loja-perfil-editar.html',
})
export class LojaPerfilEditarPage {

  atualizarForm: FormGroup;
  lojaRef: AngularFirestoreDocument<Loja>;
  siglas: string[];
  dadosDaLoja: Loja;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public fireStore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.dadosDaLoja = navParams.get("loja");
    this.siglas = Validacoes.siglasDosEstados();
    this.lojaRef = fireStore.doc(`lojas/${this.dadosDaLoja.id}`);

    this.atualizarForm = this.formBuilder.group({
      nome: this.formBuilder.control(this.dadosDaLoja.nome, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      descricao: this.formBuilder.control(this.dadosDaLoja.descricao),
      telefone: this.formBuilder.control(this.dadosDaLoja.telefone, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.telefonePattern())])),
      email: this.formBuilder.control(this.dadosDaLoja.email, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.emailPattern())])),
      website: this.formBuilder.control(this.dadosDaLoja.website),
      endereco: this.formBuilder.control(this.dadosDaLoja.endereco.rua, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      complemento: this.formBuilder.control(this.dadosDaLoja.endereco.complemento),
      bairro: this.formBuilder.control(this.dadosDaLoja.endereco.bairro, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cidade: this.formBuilder.control(this.dadosDaLoja.endereco.cidade, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      estado: this.formBuilder.control(this.dadosDaLoja.endereco.estado, Validators.compose([
        Validators.required, Validators.minLength(2)])),
      cep: this.formBuilder.control(this.dadosDaLoja.endereco.cep, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.cepPattern())]))
    });
  }

  get nome() {
    return this.atualizarForm.get("nome").value;
  }

  get descricao() {
    return this.atualizarForm.get("descricao").value;
  }

  get telefone() {
    return this.atualizarForm.get("telefone").value;
  }

  get email() {
    return this.atualizarForm.get("email").value;
  }

  get website() {
    return this.atualizarForm.get("website").value;
  }

  get endereco() {
    return this.atualizarForm.get("endereco").value;
  }

  get complemento() {
    return this.atualizarForm.get("complemento").value;
  }

  get bairro() {
    return this.atualizarForm.get("bairro").value;
  }

  get cidade() {
    return this.atualizarForm.get("cidade").value;
  }

  get estado() {
    return this.atualizarForm.get("estado").value;
  }

  get cep() {
    return this.atualizarForm.get("cep").value;
  }

  async salvarAlteracoes() {
    let carregamento: Loading = this.loadingCtrl.create();
    try {
      if (this.atualizarForm.valid) {
        carregamento.present();
        await this.lojaRef.update({
          nome: this.nome,
          telefone: this.telefone,
          descricao: this.descricao,
          endereco: {
            rua: this.endereco,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
            cep: this.cep
          }
        });
        carregamento.dismiss();
        let alertaSucesso: Alert = this.alertCtrl.create({
          title: 'Sucesso',
          message: "Os dados da loja foram atualizados",
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }],
        });
        alertaSucesso.present();
      }
    } catch (error) {
      carregamento.dismiss()
      let alertaErro: Alert = this.alertCtrl.create({
        message: "Ocorreu um erro ao atualizar os dados da loja",
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      alertaErro.present();
    }
  }
}
