import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifcationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import * as CryptoJS from "crypto-js";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginuserdata={
    username:'',
    password:''
  }
  ret=''
  task:any
  secret: any = "sunny";
  constructor(private auth:AuthService,private router:Router,private notif :NotifcationService,private tasks: TaskService) {
    
   }

  ngOnInit(): void {
  }
loginuser(){
  this.auth.loginuser(this.loginuserdata).subscribe(
    res=>{
     console.log(res.access)
     var check=true
     this.task=this.loginuserdata.username
     localStorage.user = this.encrypt(JSON.stringify(this.task));
     this.notif.getusername(this.task,check)
      localStorage.setItem('token',res.access)
      this.router.navigate(['/todo'])
    },
    err=>{this.ret=err.error
     }
  )
}
encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, this.secret.trim()).toString();
}
}
