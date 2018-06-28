import { CompraPage } from './../compra/compra';
import { ProdutoService } from './../../providers/produto/produto.service';
import { Produto } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {

  produtoId: string;
  arrayCarrinho: Produto[];
  itemCheck: number = 0;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toast: ToastController,
              private prodService: ProdutoService
             ) {
    this.arrayCarrinho = this.navParams.get('arrayNovo');
    this.produtoId = this.navParams.get('paramId');
  }

  ngOnInit(){
    this.getProduto();
  }

  prodDetails: Produto;

  getProduto(){
    this.prodService.getProdutos().subscribe((produtos) => {
      for(let i=0; i<produtos.length; i++) {
        if(produtos[i].prodId == this.produtoId){
          console.log(produtos[i]);
          return this.prodDetails = produtos[i];
        }
      }
    });
  }

  addCarrinho(){
    this.arrayCarrinho.forEach((entry) => {
      if(entry.prodId == this.prodDetails.prodId){
        this.itemCheck++;
      }
    });

    if(this.itemCheck == 0){
      this.navCtrl.push(CompraPage, {
        arrayCarr: this.arrayCarrinho,
        produto: this.prodDetails
      });
    }else{
      this.toast.create({
        message: 'Você já adicionou esse produto!',
        duration: 2000,
        position: 'bottom'
      }).present();
      this.navCtrl.pop();
    }
  }

}
