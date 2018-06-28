import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LojaProdutosAdicionarPage } from './loja-produtos-adicionar';

@NgModule({
  declarations: [
    LojaProdutosAdicionarPage,
  ],
  imports: [
    IonicPageModule.forChild(LojaProdutosAdicionarPage),
  ],
})
export class LojaProdutosAdicionarPageModule {}
