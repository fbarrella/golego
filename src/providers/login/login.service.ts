import { Usuario } from './../../models/usuario.model';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';

@Injectable()
export class LoginService {

    public usuarioLogado = {} as Usuario;
    private db: firebase.firestore.Firestore;

    constructor(public afAuth: AngularFireAuth, public fireStore: AngularFirestore) {
        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true })
        this.afAuth.authState.subscribe(usuario => this.setLoggedUser(usuario));
    }

    login(email: string, password: string): Promise<firebase.User> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<any> {
        return this.afAuth.auth.signOut()
    }

    resetPassword(email: string): Promise<void> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    setLoggedUser(usuario: User) {
        /*const usuarioDocument = this.db
            .doc(`user/${usuario.uid}`)
            .get()
            .then(resp => {
                let doc = resp.data();
                this.usuarioLogado = {
                    uid: usuario.uid,
                    fullName: doc.fullName,
                    displayName: doc.displayName,
                    birthDate: doc.birthDate.toDate(),
                    avatarUrl: doc.avatarUrl,
                    phoneNumber: doc.phoneNumber,
                    hasStore: doc.hasStore,
                    storeId: doc.storeId
                }
            })
            .catch(err => {
                console.log(err);
            });

        console.log(this.usuarioLogado);*/
    }

    clearLoggedUser() {
    }

    criarUsuario() {
        console.log("criou o usuário");
    }
}