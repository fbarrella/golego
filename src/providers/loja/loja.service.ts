import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Loja } from './../../models/loja.model';
import { Injectable } from '@angular/core';


@Injectable()
export class LojaService {

  constructor(public fireStore: AngularFirestore) {
    ;
  }

  async criarLoja(loja: Loja) {
    const lojaRef: AngularFirestoreDocument<Loja> = this.fireStore.doc(`lojas/${loja.id}`);

    await lojaRef.set(loja)
  }
}
