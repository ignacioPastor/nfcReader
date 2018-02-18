import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class  HomePage {

  nfcListener;
  mySubscription;

  constructor(public navCtrl: NavController, private platform: Platform, private nfc: NFC, private ndef: Ndef) {
    
  }

  ionViewDidLoad() {
    this.bindNfcListenter();
  }

  // FIXME: There is no need to bind this function to a button in Android. Need to check if is relevant do it in ios
  async bindNfcListenter() {
    // TODO: check with ios device if this make nfc work in ios
    if (this.platform.is('ios')) {
      let bSession;
      try { 
        bSession = await this.nfc.beginSession();
      }
      catch (err) {console.log("err init session", err);}
    }
    
    try {
      this.nfcListener = await this.nfc.addNdefListener();

    } catch (errAdd) {
      console.log("Err adding the listener", errAdd);
    }

  }

  startRead() {
    try {if (this.mySubscription) this.mySubscription.unsubscribe();} catch(err) {};
    this.mySubscription = this.nfcListener.subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      // let message = this.ndef.textRecord('Hello world');
      // this.nfc.share([message]).then(onSuccess).catch(onError);
    });
  }

  stopReading(){
    this.mySubscription.unsubscribe();
  }

}
