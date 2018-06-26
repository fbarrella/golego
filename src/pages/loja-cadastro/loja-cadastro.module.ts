import { LojaCadastroPage } from './loja-cadastro';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
    declarations: [
        LojaCadastroPage,
    ],
    imports: [
        IonicPageModule.forChild(LojaCadastroPage),
    ],
})
export class LojaCadastroPageModule { }
