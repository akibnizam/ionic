import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiddlesPage } from './riddles';

@NgModule({
  declarations: [
    RiddlesPage,
  ],
  imports: [
    IonicPageModule.forChild(RiddlesPage),
  ],
})
export class RiddlesPageModule {}
