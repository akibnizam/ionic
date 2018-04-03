import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LogFunc } from '../../providers/log-func';



@Component({
  selector: 'page-riddles',
  templateUrl: 'riddles.html'
})
export class RiddlesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public database: AngularFireDatabase, public toastCtrl: ToastController,
    public afAuth: AngularFireAuth, public alertCtrl: AlertController, public modalCtrl: ModalController,
    public logg: LogFunc) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiddlesPage');
  }

}
