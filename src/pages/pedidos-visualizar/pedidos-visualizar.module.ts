import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosVisualizarPage } from './pedidos-visualizar';

@NgModule({
  declarations: [
    PedidosVisualizarPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosVisualizarPage),
  ],
})
export class PedidosVisualizarPageModule {}
