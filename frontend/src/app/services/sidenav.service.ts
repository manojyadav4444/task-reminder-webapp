import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  shareData:boolean=false
  countNotif:number=0
  isOpened:Subject<any>=new Subject<any>()
  count:Subject<any>=new Subject<any>()
  constructor() {
    this.isOpened.subscribe(value=>{
      this.shareData=value
     
    })
   }
   changevalue(value){
    this.isOpened.next(value)
   }
   setvalue(data){
     
     this.shareData=data
    // console.log(this.shareData)
     this.changevalue(this.shareData)
   }
   setvalue2(){
    this.count.next(this.countNotif)
   
   }
}
 