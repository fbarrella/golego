import { Produto } from './../../models/produto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validacoes } from '../../utils/validators';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-loja-produtos-editar',
  templateUrl: 'loja-produtos-editar.html',
})
export class LojaProdutosEditarPage {

  produto: Produto;
  categorias: string[];
  produtoForm: FormGroup;
  produtoRef: AngularFirestoreDocument<Produto>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fireStore: AngularFirestore,
  ) {

    this.produto = this.navParams.get("produto") as Produto;
    this.categorias = Validacoes.categorias();
    this.produtoRef = fireStore.doc(`user/${this.produto.id}`);

    this.produtoForm = this.formBuilder.group({
      quantidade: this.formBuilder.control('', Validators.compose([
        Validators.required])),
      descricao: this.formBuilder.control(''),
      preco: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.min(1)])),
      tipo: this.formBuilder.control('', Validators.compose([Validators.required]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LojaProdutosEditarPage');
  }

  get quantidade() {
    return this.produtoForm.get("quantidade").value;
  }

  get descricao() {
    return this.produtoForm.get("descricao").value;
  }

  get preco() {
    return this.produtoForm.get("preco").value;
  }

  get tipo() {
    return this.produtoForm.get("tipo").value;
  }

  async salvarAlteracoes() {
    let carregamento: Loading = this.loadingCtrl.create();
    try {
      if (this.produtoForm.valid) {
        carregamento.present();
        await this.produtoRef.update({
          emEstoque: this.quantidade,
          descricao: this.descricao,
          preco: this.preco,
          tipo: this.tipo
        });
        carregamento.dismiss();
        let alertaSucesso: Alert = this.alertCtrl.create({
          title: 'Sucesso',
          message: "Os dados do produto foram atualizados",
          buttons: ['Dismiss'],
        });
        alertaSucesso.present();
      }
    } catch (error) {
      carregamento.dismiss()
      let alertaErro: Alert = this.alertCtrl.create({
        message: "Ocorreu um erro ao atualizar os dados dos produtos",
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      alertaErro.present();
    }
  }

}
