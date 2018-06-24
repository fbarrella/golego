import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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

  private dadosDoUsuario = {} as Usuario;
  private formEditar: FormGroup;
  private siglas: string[];

  // Upload
  private task: AngularFireUploadTask;
  private downloadUrl: Observable<string>;
  private porcentagem: Observable<number>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public fileChooser: FileChooser,
    public file: File,
    public storage: AngularFireStorage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.dadosDoUsuario = navParams.data;
    this.siglas = Validacoes.siglasDosEstados();
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

  atualizarUsuario() {
    console.log(this.formEditar.value);
  }

  escolherFoto() {
    let carregamento = this.loadingCtrl.create();
    try {
      this.fileChooser.open().then((uri) => {
        alert(uri);
        //Recebe a uri do sistema e obtem os detalhes
        this.file.resolveLocalFilesystemUrl(uri).then((fileUri) => {
          alert(JSON.stringify(fileUri));

          //obtém o caminho do direitório da foto
          let dirPath = fileUri.nativeURL;
          let split = dirPath.split('/');
          split.pop();
          dirPath = split.join('/');

          this.file.readAsArrayBuffer(dirPath, fileUri.name).then(async (buffer) => {
            carregamento.present();
            await this.subirFoto(buffer, fileUri.name);
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
  async subirFoto(buffer: ArrayBuffer, name: string) {
    const path = `imagens/users/${this.dadosDoUsuario.uid}_${name}`;
    const fotoBlob = new Blob([buffer], { type: "image" });
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, fotoBlob);
    this.porcentagem = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = fileRef.getDownloadURL())
    ).subscribe()
  }


}
