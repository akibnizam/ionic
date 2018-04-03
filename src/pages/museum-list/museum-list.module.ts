import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseumListPage } from './museum-list';

@NgModule({
  declarations: [
    MuseumListPage,
  ],
  imports: [
    IonicPageModule.forChild(MuseumListPage),
  ],
})
export class MuseumListPageModule {}
