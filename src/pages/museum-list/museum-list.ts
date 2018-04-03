import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, NavParams, AlertController, ToastController, ModalController  } from 'ionic-angular';

import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
//import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LogFunc } from '../../providers/log-func';


@Component({
  selector: 'page-museum-list',
  templateUrl: 'museum-list.html',
})
export class MuseumListPage {

  exhibits: Observable<any[]>;
  numExh: any;
  museList: string[] = ["Museum of Metz"];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public database: AngularFireDatabase, public toastCtrl: ToastController,
    public afAuth: AngularFireAuth, public alertCtrl: AlertController, public modalCtrl: ModalController,
    public logg: LogFunc) {


    this.exhibits = this.database.list('/exhibits').valueChanges();
    this.exhibits.subscribe(x => {
      this.numExh = x.length;
    })
  }


  goHome(nme:string) {
    this.navCtrl.push(HomePage, {
      museName: nme
    });
  }




  // ionViewDidLoad() {
  //   this.logg.checkLoggedUser();
  // }

}
