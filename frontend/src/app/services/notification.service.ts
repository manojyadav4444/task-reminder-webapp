import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class NotifcationService {
  readonly uri = "ws://localhost:8000/ws/chat/"; 
  //private notif = "http://localhost:3000/api/notif";
  socket: any;
  user: string;
  usercheck = false;
  private notifArraySource = new Subject<any>();
  private userlen = new Subject<any>();
  len:any
  notifArray: any;
  notifArray$: any;
  user$: any;
  getusername(data, check) {
  
    this.user = data;
  }
  getname() {
    return this.user;
  }
  
  runwebsocket() {
    let ws = new WebSocket(`${this.uri}${this.user}/`);
    this.notifArray$ = this.notifArraySource.asObservable();

    let user1 = this.user;
    ws.onopen = function () {
      ws.send(user1);
      console.log("websocket connected");
    };
    ws.onmessage = (e) => {
      this.notifArray = e.data;
      this.getNotif(this.notifArray);
    };
  }
  getlength(data) {
    //this.len= this.userlen.asObservable();
    this.getlengthfinal(data)
  }
  getlengthfinal(data) {
    this.userlen.next(data)
  }
  constructor() {}

  getNotif(result) {
    this.notifArraySource.next(result);
  }
  returnlen(): Observable<any>{
    this.len=this.userlen.asObservable();
    return this.len
  }
  returnNotifArrayObs(): Observable<any> {
    this.notifArray$ = this.notifArraySource.asObservable();
    return this.notifArray$;
  }
}
