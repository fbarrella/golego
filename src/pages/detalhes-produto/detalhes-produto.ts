import { ProdutoService } from './../../providers/produto/produto.service';
import { Produto } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {

  produtoId: string;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private prodService: ProdutoService
             ) {
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

}
