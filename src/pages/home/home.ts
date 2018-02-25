import { Component } from '@angular/core';
import { NavController,LoadingController,ActionSheetController } from 'ionic-angular';
import {MusicProvider} from "../../providers/music/music";
import {SocialSharing} from '@ionic-native/social-sharing'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic:any=[];

  constructor(
    private socialSharing:SocialSharing,
    private actionSheetController:ActionSheetController,
    private loadingController:LoadingController, 
    private musicProvider:MusicProvider, 
    public navCtrl: NavController) {

  }
  
  ionViewDidLoad(){
    let allMusicLoading=this.loadingController.create({
      content:"Loading Music"
    });

    allMusicLoading.present();
    this.musicProvider.getMusic()
      .subscribe((musicList)=>{
        allMusicLoading.dismiss();
        this.allMusic=musicList 
      });
     
  }


  addOneSong(refresher){
    this.musicProvider.getOneSong()
        .subscribe((musicList)=>{
        this.allMusic.unshift(musicList[6]);
        refresher.complete();
      });
  }

  shareSong(music){
    let shareSong=this.actionSheetController.create({
      title:"Share Song",
      buttons:[
        {
        text:"Facebook",
        icon:"logo-facebook",
        handler:()=>{
          this.socialSharing.shareViaFacebook(music.name,music.image,music.music_url)
        }
      },
      {
        text:"Twitter",
         icon:"logo-twitter",
          handler:()=>{
          this.socialSharing.shareViaTwitter(music.name,music.image,music.music_url)
        }
      },
      {
        text:"Share",
         icon:"share",
          handler:()=>{
          this.socialSharing.share(music.name,"",music.image,music.music_url)
        }
      },
      {
        text:"Cancel",
        role:"descrtuctive"
      }
      
      ]
    });
shareSong.present();

  }
}
