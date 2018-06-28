import { Usuario } from './../../models/usuario.model';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class LoginService {

    public usuarioLogado = {} as Usuario;
    private db: firebase.firestore.Firestore;

    constructor(public afAuth: AngularFireAuth, public fireStore: AngularFirestore) {
        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true })
    }

    login(email: string, password: string): Promise<firebase.User> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<any> {
        return this.afAuth.auth.signOut()
    }

    resetarSenha(email: string): Promise<void> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    async setUsuarioLogado(uid: string) {
        try {
            const usuarioDocument: firebase.firestore.DocumentSnapshot =
                await this.db
                    .doc(`user/${uid}`)
                    .get();

            let dados = usuarioDocument.data();

            this.usuarioLogado = {
                uid: dados.uid,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                email: dados.email,
                emailVerificado: dados.emailVerified,
                dataNasc: dados.dataNasc,
                avatarUrl: dados.avatarUrl,
                telefone: dados.telefone,
                possuiLoja: dados.possuiLoja,
                lojaId: dados.lojaId,
                endereco: dados.endereco
            }

            console.log(this.usuarioLogado);
        } catch (error) {
            throw error();
        }
    }

    async buscarUsuario(uid: string) {
        try {
            const usuarioDocument: firebase.firestore.DocumentSnapshot =
                await this.db
                    .doc(`user/${uid}`)
                    .get();

            let dados = usuarioDocument.data();

            return {
                uid: dados.uid,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                email: dados.email,
                emailVerificado: dados.emailVerified,
                dataNasc: dados.dataNasc,
                avatarUrl: dados.avatarUrl,
                telefone: dados.telefone,
                possuiLoja: dados.possuiLoja,
                lojaId: dados.lojaId,
                endereco: dados.endereco
            }
        } catch (error) {
            throw error();
        }
    }

    limparUsuarioLogado() {
        this.usuarioLogado = null
    }

    async criarUsuario(email: string, senha: string, dadosDoPerfil: Usuario): Promise<firebase.User> {
        try {
            const usuario: firebase.User = await this.afAuth.auth.createUserWithEmailAndPassword(email, senha);
            const perfilRef: AngularFirestoreDocument<Usuario> = this.fireStore.doc(`user/${usuario.uid}`);
            await perfilRef.set({
                nome: dadosDoPerfil.nome,
                sobrenome: dadosDoPerfil.sobrenome,
                dataNasc: dadosDoPerfil.dataNasc,
                telefone: dadosDoPerfil.telefone,
                possuiLoja: false,
                endereco: dadosDoPerfil.endereco
            }, { merge: true });
            return usuario;
        } catch (error) {
            console.log(error);
            throw new Error("Erro na criação de usuário");
        }
    }
}