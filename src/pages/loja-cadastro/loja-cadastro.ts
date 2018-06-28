import { Usuario } from './../../models/usuario.model';
import { LojaService } from './../../providers/loja/loja.service';
import { LoginService } from './../../providers/login/login.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { Validacoes } from '../../utils/validators';
import { Loja } from '../../models/loja.model';


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
    public formBuilder: FormBuilder,
    public fireStore: AngularFirestore,
    public loginService: LoginService,
    public lojaService: LojaService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.criacaoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      documento: this.formBuilder.control('', Validators.compose([
        Validators.required])),
      descricao: this.formBuilder.control(''),
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

  get nome() {
    return this.criacaoForm.get("nome").value;
  }

  get documento() {
    return this.criacaoForm.get("documento").value;
  }

  get descricao() {
    return this.criacaoForm.get("descricao").value;
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

  async criarLoja() {
    console.log(this.criacaoForm);
    console.log(this.criacaoForm.value);
    if (this.criacaoForm.valid) {
      let carregamento: Loading;
      carregamento = this.loadingCtrl.create();
      carregamento.present();
      const lojaId = this.fireStore.createId();
      const usuarioId = this.loginService.usuarioLogado.uid;
      const cnpj = this.documento.replace(/[^\d]+/g, '');
      const dados: Loja = {
        id: lojaId,
        usuarioId: usuarioId,
        nome: this.nome,
        descricao: this.descricao,
        documento: cnpj,
        telefone: this.telefone,
        ativa: false,
        email: this.email,
        website: this.website,
        avatarUrl: "https://firebasestorage.googleapis.com/v0/b/golego-199917.appspot.com/o/imagens%2Fassets%2Fbeer.png?alt=media&token=dce9cba2-3ece-42f2-bf12-06a575198af1",
        endereco: {
          rua: this.endereco,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          cep: this.cep
        }
      }
      try {
        await this.lojaService.criarLoja(dados);

        await this.fireStore
          .doc<Usuario>(`user/${this.loginService.usuarioLogado.uid}`)
          .update({ possuiLoja: true, lojaId: lojaId });

        await carregamento.dismiss();
        this.loginService.setUsuarioLogado(usuarioId);
        this.navCtrl.pop();
      } catch (error) {
        await carregamento.dismiss();
        const alerta: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        alerta.present();
      }
    }
  }

}
