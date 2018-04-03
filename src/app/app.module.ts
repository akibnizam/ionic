import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ModalArtPage } from '../pages/modal-art/modal-art';
import { MuseumListPage } from '../pages/museum-list/museum-list';
import { RiddlesPage } from '../pages/riddles/riddles';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { LogFunc } from '../providers/log-func';
// import { FirebaseService } from './../providers/firebase-service';

//import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA_Syg3sZzK4k1sPdRcpnzZ2vehmi9LnhE",
    authDomain: "museumapp-cfd9c.firebaseapp.com",
    databaseURL: "https://museumapp-cfd9c.firebaseio.com",
    projectId: "museumapp-cfd9c",
    storageBucket: "museumapp-cfd9c.appspot.com",
    messagingSenderId: "389784218704"
  };

  //firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MuseumListPage,
    ModalArtPage,
    RiddlesPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MuseumListPage,
    ModalArtPage,
    RiddlesPage,
    LoginPage
  ],
  providers: [
    LogFunc,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
