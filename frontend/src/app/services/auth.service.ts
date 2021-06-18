import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';

@Injectable()
export class AuthService {
  private registerurl='http://127.0.0.1:8000/register/'
  private loginurl='http://127.0.0.1:8000/login/'

 
  constructor(private http : HttpClient,private route:Router,private shared: SidenavService) { }
  //register User
  registeruser(user:any){
    return this.http.post<any>(this.registerurl,user)
  }
  //login user
  loginuser(user:any){
    return this.http.post<any>(this.loginurl,user)
  }
  
  loggedIn(){
    
    return !!localStorage.getItem('token')
  }
  //logout user
  logout(){
    this.shared.setvalue(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.route.navigate(['/login'])
  }
  //gettoken
  getToken(){
    return localStorage.getItem('token')
  }
}
 