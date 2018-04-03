import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
// import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-modal-art',
  templateUrl: 'modal-art.html',
})
export class ModalArtPage {

    itemRec: any[];
    index: number;
    objKeys = Object.keys;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemRec = this.navParams.data.items;
    this.index = this.navParams.data.index;


    // var temp = any[][];
    // var count = 0;
    // for (let xs of this.itemRec) {
    //     Object.keys(xs.English.content).forEach(function(keys, ind) {
    //         this.contentList[count++][ind] = xs.English.content[keys];
    //     })
    // }

    // console.log(this.contentList);

    //this.contentList = temp;

    //console.log(navParams);
  }

  decInd() {
    if (this.index > 0) this.index--;
  }

  incInd() {
    if ( (this.index + 1) < this.itemRec.length) {this.index++;}
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModalArtPage');
  }

}
