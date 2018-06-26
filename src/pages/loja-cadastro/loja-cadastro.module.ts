import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LojaCadastroPage } from './loja-cadastro';

@NgModule({
  declarations: [
    LojaCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(LojaCadastroPage),
  ],
})
export class LojaCadastroPageModule {}
