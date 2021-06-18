import { Component, OnInit } from '@angular/core';
import { NotifcationService } from 'src/app/services/notification.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import * as CryptoJS from "crypto-js";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  opened:any
  notifArray:any
  i:any
  count:number=0
  user:any
  valid:Array<boolean>=[]
  finalarray=[]
   secret: any = "sunny";
  r:any
  constructor(private shared:SidenavService,private notif :NotifcationService) {
    this.shared.isOpened.subscribe(value=>this.opened=value)  
    this.shared.count.subscribe(value=>this.count=value) 
    
   }
  
  ngOnInit(): void {
    
    this.returnNotificationArray();
    
   
  }
  getNotif(data){
    var obj={}
     obj['user']=data
    this.finalarray.push(obj)
    this.valid.push(true)
    this.count=this.count+1
    this.notif.getlength(this.count)
    
  }
  delete(i){
    this.valid[i]=false
    
  }
  
  returnNotificationArray(){
    
    this.notif.returnNotifArrayObs().subscribe(
      (result:any) => {
        this.notifArray = JSON.parse(result);
        var res=this.notifArray.message.split("$")
       // console.log(res[1],localStorage.user)
       // var ans = res[1].localeCompare(localStorage.user); 
       //console.log(res)
       var ans=this.decrypt(localStorage.user)
       this.user = JSON.parse(ans);
       if(res[1]==this.user){
       
         this.getNotif(res[0])

       }
       
        //console.log("Getting Notification Array in Notif Component = ", this.notifArray);
      }
    )
 
  }
  decrypt(textToDecrypt: string) {
      return CryptoJS.AES.decrypt(textToDecrypt, this.secret.trim()).toString(
        CryptoJS.enc.Utf8
      );
    
    
  }
 
}
