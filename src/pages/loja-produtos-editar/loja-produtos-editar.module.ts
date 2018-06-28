import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LojaProdutosEditarPage } from './loja-produtos-editar';

@NgModule({
  declarations: [
    LojaProdutosEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(LojaProdutosEditarPage),
  ],
})
export class LojaProdutosEditarPageModule {}
