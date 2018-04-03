import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { RiddlesPage } from '../riddles/riddles';
import { LoginPage } from '../login/login';

//import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LogFunc } from '../../providers/log-func';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    artiListRef$: AngularFireList<any[]>;
    tab1: any;
    tab2: any;
    loggedIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,
    public alertCtrl: AlertController, public modalCtrl: ModalController, public afAuth: AngularFireAuth, public toastCtrl: ToastController,
    public logg: LogFunc) {
    //this.artiListRef$ = this.database.list()


    this.tab1 = ListPage;
    this.tab2 = RiddlesPage;
  }


  ionViewDidLoad() {
    // this.afAuth.authState.subscribe(data => {
    //   if (data.uid) {
    //     this.loggedIn = true;
    //     this.presentToast('Logged In Successfully');
    //   } else {
    //     this.loggedIn = false;
    //   }
    // })

    this.logg.checkLoggedUser();
  }

  checkLogin() {
    if (this.logg.loggedIn && this.logg.loggedInUser) {
      console.log("You have access");
      return true;
    } else {
      console.log("Please login to access riddles!");
      return false;
    }
  }

  // goToLogin() {
  //   let modalArt = this.modalCtrl.create(LoginPage);
  //   modalArt.onDidDismiss(() => {
  //     this.afAuth.authState.subscribe(data => {
  //       if (data.uid) {
  //         this.loggedIn = true;
  //       this.presentToast('Logged In Successfully');
  //       } else {
  //         this.loggedIn = false;
  //       }
  //     })
  //   });

  //   modalArt.present();
  // }

  // logOut() {
  //     console.log("What what");
  //     this.afAuth.auth.signOut().then(() => {
  //       this.loggedIn = false;
  //       this.presentToast("Logged Out");
  //     });
  //   }

}
