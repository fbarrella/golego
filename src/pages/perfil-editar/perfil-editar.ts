import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Alert, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { Validacoes } from '../../utils/validators';
import { Usuario } from './../../models/usuario.model';

@IonicPage()
@Component({
  selector: 'page-perfil-editar',
  templateUrl: 'perfil-editar.html',
})
export class PerfilEditarPage {

  dadosDoUsuario = {} as Usuario;
  perfilRef: AngularFirestoreDocument<Usuario>;
  formEditar: FormGroup;
  siglas: string[];
  fotoTrocada: boolean = false;
  fotoUrl: string = null;

  // Upload
  task: AngularFireUploadTask;
  downloadUrl: Observable<string>;
  // private porcentagem: Observable<number>;
  @ViewChild("novaFoto") fotoRef: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private fileChooser: FileChooser,
    private file: File,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore) {
    this.dadosDoUsuario = navParams.data;
    this.siglas = Validacoes.siglasDosEstados();
    this.perfilRef = fireStore.doc(`user/${this.dadosDoUsuario.uid}`);
    this.formEditar = this.fb.group({
      nome: this.fb.control(this.dadosDoUsuario.nome, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      sobrenome: this.fb.control(this.dadosDoUsuario.sobrenome, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      telefone: this.fb.control(this.dadosDoUsuario.telefone, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.telefonePattern())])),
      endereco: this.fb.control(this.dadosDoUsuario.endereco.rua, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      complemento: this.fb.control(this.dadosDoUsuario.endereco.complemento),
      bairro: this.fb.control(this.dadosDoUsuario.endereco.bairro, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      cidade: this.fb.control(this.dadosDoUsuario.endereco.cidade, Validators.compose([
        Validators.required, Validators.minLength(3)])),
      estado: this.fb.control(this.dadosDoUsuario.endereco.estado, Validators.compose([
        Validators.required, Validators.minLength(2)])),
      cep: this.fb.control(this.dadosDoUsuario.endereco.cep, Validators.compose([
        Validators.required, Validators.pattern(Validacoes.cepPattern())]))
    });
  }

  get nome() {
    return this.formEditar.get("nome").value;
  }

  get sobrenome() {
    return this.formEditar.get("sobrenome").value;
  }

  get telefone() {
    return this.formEditar.get("telefone").value;
  }

  get endereco() {
    return this.formEditar.get("endereco").value;
  }

  get complemento() {
    return this.formEditar.get("complemento").value;
  }

  get bairro() {
    return this.formEditar.get("bairro").value;
  }

  get cidade() {
    return this.formEditar.get("cidade").value;
  }

  get estado() {
    return this.formEditar.get("estado").value;
  }

  get cep() {
    return this.formEditar.get("cep").value;
  }

  async salvarAlteracoes() {
    let carregamento: Loading = this.loadingCtrl.create();
    try {
      if (this.formEditar.valid) {
        carregamento.present();
        let foto = this.fotoUrl === null ? this.dadosDoUsuario.avatarUrl : this.fotoUrl;
        await this.perfilRef.update({
          nome: this.nome,
          sobrenome: this.sobrenome,
          telefone: this.telefone,
          avatarUrl: foto,
          endereco: {
            rua: this.endereco,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
            cep: this.cep
          }
        });
        carregamento.dismiss();
        let alertaSucesso: Alert = this.alertCtrl.create({
          title: 'Sucesso',
          message: "Os seus dados foram atualizados",
          buttons: ['Dismiss'],
        });
        alertaSucesso.present();
      }
    } catch (error) {
      carregamento.dismiss()
      let alertaErro: Alert = this.alertCtrl.create({
        message: "Ocorreu um erro ao atualizar seus dados",
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      alertaErro.present();
    }
  }

  escolherFoto() {
    let carregamento = this.loadingCtrl.create();
    try {
      this.fileChooser.open().then((uri) => {
        // alert(uri);
        //Recebe a uri do sistema e obtem os detalhes
        this.file.resolveLocalFilesystemUrl(uri).then((fileUri) => {
          // alert(JSON.stringify(fileUri));

          //obtém o caminho do direitório da foto
          let dirPath = fileUri.nativeURL;
          let split = dirPath.split('/');
          split.pop();
          dirPath = split.join('/');

          this.file.readAsArrayBuffer(dirPath, fileUri.name).then(async (buffer) => {
            carregamento.present();
            await this.atualizarFoto(buffer, fileUri.name);
            carregamento.dismiss();
          })
        })
      })
    } catch (error) {
      carregamento.dismiss();
      throw new Error(error.message);
    }
  }

  // https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
  async atualizarFoto(buffer: ArrayBuffer, name: string) {
    const path = `imagens/users/${this.dadosDoUsuario.uid}_${name}`;
    const fotoBlob = new Blob([buffer], { type: "image/jpeg" });
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, fotoBlob);
    // this.porcentagem = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = fileRef.getDownloadURL())
    ).subscribe((url) => {
      if (url) {
        this.fotoTrocada = true;
        this.fotoUrl = this.fotoRef.nativeElement.src;
      }
      else {
        this.fotoTrocada = false;
      }
    })
  }


}
