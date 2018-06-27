import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Loja } from './../../models/loja.model';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';


@Injectable()
export class LojaService {

  constructor(public fireStore: AngularFirestore) {

  }

  async criarLoja(loja: Loja): Promise<void> {
    try {
      const lojaRef: AngularFirestoreDocument<Loja> = this.fireStore.doc(`lojas/${loja.id}`);
      await lojaRef.set(loja)
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }

  buscarLojas(): Observable<Loja[]> {
    const lojasRef = this.fireStore.collection<Loja>("lojas");
    return lojasRef.valueChanges();
  }

}
