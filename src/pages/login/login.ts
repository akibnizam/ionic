import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
    user: User = {email: "", password: ""} as User;
    private userList: any[] = [];
    isRegister: boolean = false;
    isClicked: boolean = false;

    constructor(public database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,
        public afAuth: AngularFireAuth, public toastCtrl: ToastController) {

        this.database.list("/users").valueChanges().subscribe(list => {
            // var t = 0;
            // for (let l of list) {
            //     this.userList[t++] = l;
            // }

            this.userList = list;
            console.log(this.userList);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    presentToast(mess: string) {
      let toast = this.toastCtrl.create({
        message: mess,
        duration: 2500,
        position: 'bottom'
      });

      toast.present();
    }

    async login(user: User) {
        try {
            this.isClicked = true;
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                //console.log(result);
                this.isClicked = false;
                this.navCtrl.pop();
            }
        } catch (e) {
            console.log(e);
            this.isClicked = false;
            this.presentToast("Login failed. Incorrect Credentials");
        }
    }

    async register(user: User) {
        try {

            this.isClicked = true;

            var exists = false;
            for(let use of this.userList) {
                //console.log(use);
                if (use.username == user.username) {exists = true; break;}
            }
            if (exists) this.presentToast("Username is taken");
            else {
                const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

                if (result) {
                    this.database.object("/users/" + result.uid).update({
                        username: user.username,
                        score: 0,
                        solved: ["null"]
                    });
                    this.presentToast("Registered Successfully!");
                    this.login(user);
                }
            }
            this.isClicked = false;

        } catch (e) {
            this.presentToast(e.message);
            this.isClicked = false;
            console.log(e);
        }
    }
}
