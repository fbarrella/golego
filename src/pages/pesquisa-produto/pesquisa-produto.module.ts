import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaProdutoPage } from './pesquisa-produto';

@NgModule({
  declarations: [
    PesquisaProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisaProdutoPage),
  ],
})
export class PesquisaProdutoPageModule {}
