import { ProdutoService } from './../../providers/produto/produto.service';
import { DetalhesProdutoPage } from './../detalhes-produto/detalhes-produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../models/produto.model';

@IonicPage()
@Component({
  selector: 'page-pesquisa-produto',
  templateUrl: 'pesquisa-produto.html',
})
export class PesquisaProdutoPage {

  arrayNew: Produto[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private prodService: ProdutoService
             ) {
               if(this.navParams.get('arrayNovo')){
                 this.arrayNew = this.navParams.get('arrayNovo')
               }else{
                 this.arrayNew = [];
               }
  }

  ngOnInit(){
    this.getProds();
    console.log(this.prodList);
  }

  prodList: Produto[];

  getProds(){
    this.prodService.getProdutos().subscribe(produtos => this.prodList = produtos);
  }

  showDetails(produtoId: string){
    this.navCtrl.push(DetalhesProdutoPage, {
      paramId: produtoId,
      arrayNovo: this.arrayNew
    });
  }

}