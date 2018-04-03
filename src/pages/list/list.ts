import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
// import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ModalArtPage } from '../modal-art/modal-art';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // selectedItem: any;
  // icons: string[];
  // content_art: string[];
  artiListRef$: Observable<any[]>;
  articles$: Observable<any[]>;
  tags: Observable<any[]>;
  items: any[];
  checked: any[];
  testCheckboxOpen: boolean;
  testCheckboxResult: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public database: AngularFireDatabase, public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    // // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

    console.log("IN THE LIST");
    console.log(this.navParams.data);

    this.artiListRef$ = this.database.list('/exhibits').valueChanges();
    //this.items = this.artiListRef$;
    this.artiListRef$.subscribe(x => {
        this.items = x;
        console.log(this.items.length);
        //console.log(this.items);
    }, e => {console.log("ERROR");})
    this.tags = this.database.list("/tags/English").valueChanges();

    this.tags.subscribe(x => {
        var t = [];
        t.push({tag: "ALL", check: true})
        for (let xs of x) t.push({tag: xs, check: false});
        this.checked = t;
        // console.log(this.checked);
    })


  }



  ionViewDidLoad() {
    // this.artiListRef$.subscribe(x => {
    //         this.items = x;
    //         console.log(this.items);
    //     })
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }


  goToModal(its:any[], ind:number) {
       let modalArt = this.modalCtrl.create(ModalArtPage, {items: its, index: ind, museName: this.navParams.data.museName});
       modalArt.onDidDismiss(() => {
        console.log("Works like a charm");
       })
       modalArt.present();
  }


  showCheckbox() {
      let alert = this.alertCtrl.create();
      alert.setTitle('What kind of Artifacts are you looking for?');


      alert.addInput({
        type: 'checkbox',
        label: 'ALL',
        value: 'ALL',
        checked: this.checked[0].check
      });


      this.tags.subscribe(x => {
        //let cc = true;
        var inte = 1;
        for(let data of x) {
          alert.addInput({
            type: 'checkbox',
            label: data,
            value: data,
            checked: this.checked[inte++].check
          });

          //cc = false;
        };
      });




      alert.addButton('Cancel');
      alert.addButton({
        text: 'Filter',
        handler: data => {
            console.log(data);
            for (let d of this.checked) {
                if (data.indexOf(d.tag) != -1) d.check = true;
                else d.check = false;
            }
          // console.log('Checkbox data:', data);

           this.artiListRef$.subscribe(x => {
              var istems = [];
               var sk = 0;
               for (let xs of x) {
                   for (let key of Object.keys(xs.English.tags)) {
                        if(data[0] == "ALL" || data.indexOf(xs.English.tags[key]) != -1) {istems[sk++] = xs; break;}
                   }
               }

               this.items = istems;

               console.log(this.items.length);
          });

          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;
        }
      });
      alert.present();
    }



}
