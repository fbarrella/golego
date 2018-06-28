import { PRODUTOS } from './../../utils/mock-products';
import { Produto } from './../../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
    console.log('Hello ProdutoProvider Provider');
  }

  getProdutos(): Rx.Observable<Produto[]>{
    return Rx.Observable.of(PRODUTOS);
  }

}
