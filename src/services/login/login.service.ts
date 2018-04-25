import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase/app';

@Injectable()
export class LoginService {
    constructor(public afAuth: AngularFireAuth) {
        console.log("Utilizando o LoginService")      
    }

    login(email: string, password: string): Promise<firebase.User> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<any> {
        return this.afAuth.auth.signOut()
    }
}