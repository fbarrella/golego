import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Loja } from './../../models/loja.model';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


@Injectable()
export class LojaService {

  private db: firebase.firestore.Firestore;

  constructor(public fireStore: AngularFirestore) {
    this.db = firebase.firestore();
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

  lojaPorId(id: string) {
    return this.fireStore.doc<Loja>(`/lojas/${id}`);
  }

  lojasPorFiltro(nome?: string, estado?: string) {

    if (nome !== null) {
      return this.fireStore.collection<Loja>("lojas", ref => ref.where("nome", "==", nome));
    }
    if (estado !== null) {
      return this.fireStore.collection<Loja>("lojas", ref => ref.where("estado", "==", estado));
    }

  }

  lojas() {
    return this.fireStore.collection<Loja>("lojas");
  }

  buscarLojaAtiva(id: string) {
    return this.db
      .doc(`lojas/${id}`)
      .get();
  }


}
