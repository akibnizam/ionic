import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, ToastController, ModalController  } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';


@Injectable()
export class LogFunc {
  public loggedIn: boolean = false;
  public loggedInUser: any;

  constructor(public database: AngularFireDatabase, public toastCtrl: ToastController,
    public afAuth: AngularFireAuth, public alertCtrl: AlertController, public modalCtrl: ModalController)
    {
        this.checkLoggedUser();
    }


    presentToast(message:string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2500,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }

    goToLogin() {
      let modalArt = this.modalCtrl.create(LoginPage);
      modalArt.onDidDismiss(() => {
        this.checkLoggedUser();
      });

      modalArt.present();
    }

    logOut() {
        console.log("What what");
        this.afAuth.auth.signOut().then(() => {
            this.loggedIn = false;
            this.loggedInUser = null;
            this.presentToast("Logged Out");
      });
    }

    checkLoggedUser() {
        this.afAuth.authState.subscribe(data => {
          if (data && data.uid) {
            var g = this.database.object("/users/" + data.uid).valueChanges().subscribe(user => {
                this.loggedInUser = user;
                //console.log(this.loggedInUser);
            });
            if (!this.loggedIn) this.presentToast('Logged In Successfully');
            this.loggedIn = true;
          } else {
            console.log("Not logged in");
            this.loggedIn = false;
            this.loggedInUser = null;
          }
        })
    }

}