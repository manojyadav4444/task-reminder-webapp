import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {  Validators,NgForm } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData={
    username:"",
    password:""
  }
  aleradyUser:any
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  //register user
  registeruser(){
    this.auth.registeruser(this.registerUserData)
    .subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this.router.navigate(['/login'])
      },
      err=>{
        this.aleradyUser=err.status
      }
    )
  }
}
