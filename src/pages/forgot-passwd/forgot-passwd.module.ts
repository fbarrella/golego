import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswdPage } from './forgot-passwd';

@NgModule({
  declarations: [
    ForgotPasswdPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPasswdPage),
  ],
})
export class ForgotPasswdPageModule {}
