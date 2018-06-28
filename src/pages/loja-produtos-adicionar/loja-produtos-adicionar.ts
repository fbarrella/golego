import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validacoes } from '../../utils/validators';
import { Produto } from '../../models/produto.model';

@IonicPage()
@Component({
  selector: 'page-loja-produtos-adicionar',
  templateUrl: 'loja-produtos-adicionar.html',
})
export class LojaProdutosAdicionarPage {

  produtoForm: FormGroup;
  categorias: string[];
  lastId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {

    this.categorias = Validacoes.categorias();
    this.lastId = this.navParams.get("lastId");

    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.minLength(3)])),
      quantidade: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.min(0)])),
      descricao: this.formBuilder.control(''),
      preco: this.formBuilder.control('', Validators.compose([
        Validators.required, Validators.min(1)])),
      tipo: this.formBuilder.control('', Validators.compose([Validators.required]))
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LojaProdutosAdicionarPage');
  }

  get nome() {
    return this.produtoForm.get("nome").value;
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

  addProduto() {
    let newId = (parseInt(this.lastId) + 1).toString();
    let produto = {
      nome: this.nome,
      prodId: newId,
      emEstoque: this.quantidade,
      preco: this.preco,
      descricao: this.descricao
    }
    this.navCtrl.getPrevious().data.novoProduto = produto;
  }


}
