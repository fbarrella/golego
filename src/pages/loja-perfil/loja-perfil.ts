import { first } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LojaService } from './../../providers/loja/loja.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loja } from '../../models/loja.model';

@IonicPage()
@Component({
  selector: 'page-loja-perfil',
  templateUrl: 'loja-perfil.html',
})
export class LojaPerfilPage {

  loja$: Observable<Loja[]>
  donoId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireStore: AngularFirestore,
    public lojaService: LojaService) {
    this.donoId = this.navParams.get("donoId");
    this.loja$ = this.fireStore
      .collection<Loja>("/lojas", ref => ref.where("usuarioId", "==", this.donoId))
      .valueChanges()
      .pipe(
      first()
      );
  }


}
