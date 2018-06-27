import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaLojaPage } from './pesquisa-loja';

@NgModule({
  declarations: [
    PesquisaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisaLojaPage),
  ],
})
export class PesquisaLojaPageModule {}
