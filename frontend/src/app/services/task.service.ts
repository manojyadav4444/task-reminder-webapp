import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {
  private taskurl="http://127.0.0.1:8000/todo/"
  private posturl="http://127.0.0.1:8000/todo/"
  constructor(private http:HttpClient) { }
  gettasks(){
    let auth_token=localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });
    return this.http.get<any>(this.taskurl, { headers: reqHeader })
  }
  addtask(data:any){
   // console.log(data)
    return this.http.post<any>(this.taskurl,data)
  }
  edittask(data2:any){
    return this.http.put<any>(`${this.posturl}${data2.id}/`,data2)
  } 
  delete(i:any){
    return this.http.delete<any>(`${this.posturl}${i.id}/`)
  }
  markdone(data:any){
    return this.http.post<any>(this.taskurl,data)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  
}
 