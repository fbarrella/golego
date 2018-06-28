import { Validacoes } from './../../utils/validators';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Alert, Loading } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pagamentoForm: FormGroup;
  valor: number;
  siglas: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.valor = this.navParams.get("valor");
    this.siglas = Validacoes.siglasDosEstados();
    this.pagamentoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cartao: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      data: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cvv: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      endereco: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      bairro: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cidade: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      estado: this.formBuilder.control('', Validators.compose([
        Validators.required]))
    });
  }

  pagar() {
    let carregamento: Loading;
    carregamento = this.loadingCtrl.create();
    carregamento.present();

    for (var i = 0; i < 1000000000; i++) {
      let a = i;
    }

    carregamento.dismiss();
    const alerta: Alert = this.alertCtrl.create({
      message: "Pagamento processado",
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
      }],
    });

    alerta.present();
  }
}

