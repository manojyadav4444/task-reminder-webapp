import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { SidenavService } from 'src/app/services/sidenav.service';
import { NotifcationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'] 
})
export class TaskComponent implements OnInit {
  total_task=[]
  edit1=false
  istrue=false
  time_not_allowed=false
  date_not_allowed=false
  len=0
  now:any
  today:any
  date=''
   se=''
   ti='09:09'
   i=0
   color='rgb(73, 150, 59)'
   l=0
   isnotif=false
   
   //Initializing
  myForm= new FormGroup(
    {
      taskname: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      time: new FormControl('',Validators.required),
      status:new FormControl(false,Validators.required)
    }
  );
  constructor(private task:TaskService,private route:AuthService,private datePipe: DatePipe,private shared:SidenavService,private notif: NotifcationService,){
    var user=this.notif.getname()
    this.notif.getusername(user,true)
    this.notif.runwebsocket()
  }
  ngOnInit() {
    this.gettask()
    this.getlength()
  }
  getlength(){
    this.notif.returnlen().subscribe(
      res=>{
       this.l=res
      }
    )
  }
  
  //Get all the tasks 
  gettask(){ 
    this.task.gettasks().subscribe(
      res=>{this.total_task=res
      //  console.log(this.total_task)
        this.len=this.total_task.length
      },
      err=> console.log(err)
    ) 
  }
  alarm(){
    this.l=0
    this.isnotif=!this.isnotif
    this.shared.setvalue(this.isnotif)
    this.shared.setvalue2()
  } 
  //logout
  logout(){
    this.route.logout()
  }

  //Mark the task as done
  markasdone(i:any){
    var d:any=this.total_task[i]
    var data:any={
      author:d.author,
      dt:d.dt,
      id:d.id,
      status:true,
      title:d.title
    }
    this.task.edittask(data).subscribe(
      res=>{ this.gettask() },
      err=>console.log(err)
    )
  }

  //Delete operation
  delete(i:any){
    var id:any=this.total_task[i]
    var data={
      id:id.id
    }
    this.task.delete(data).subscribe(
      res=>{ this.gettask() },
      err=>console.log(err)
    )
  }

  //vgccInitializing input fields when click on edit button
  edit(index:any){
    this.i=index
    this.edit1=true
    var d:any=this.total_task[index]
    var tt:any=d.dt
    this.se=tt
    var time = this.datePipe.transform(this.se,'HH:mm')
    var date = moment(this.se).format('YYYY-MM-DD')
    this.myForm.patchValue({
      taskname:d.title,
      date:date,
      time:time
    })
  }

  //Edit task
  final_edit(){

    var t=this.i
    var d=this.total_task[t]
    var date=this.myForm.get("date").value
  var time=this.myForm.get("time").value
  var final=new Date(date)
  var hh=time[0]+time[1]
  var mm=time[3]+time[4]
  final.setHours(hh,mm,0,0)
  this.now=new Date()
  if(final.getDate()<this.now.getDate()){
    this.date_not_allowed=true
   }else if(final.getTime()<this.now.getTime()){
    this.date_not_allowed=false
    this.time_not_allowed=true
  }else{
    this.time_not_allowed=false
    this.date_not_allowed=false
    this.edit1=false
  var data2={
    id:d.id,
    title:this.myForm.get("taskname").value,
    dt:final,
    status:this.myForm.get("status").value
  }
  this.task.edittask(data2).subscribe(
    res=>{ this.gettask() },
    err=>console.log(err)
  )
   }
  }
 //Add new task
addtask(){

  var date:any=this.myForm.get("date").value
  var time=this.myForm.get("time").value
  var final=new Date(date)
  var hh=time[0]+time[1]
  var mm=time[3]+time[4]
  final.setHours(hh,mm,0,0)
  this.today=new Date()
  if(final.getDate()<this.today.getDate()){
   this.date_not_allowed=true
  }else if(final.getTime()<this.today.getTime()){
    this.date_not_allowed=false
    this.time_not_allowed=true
  }else{
    this.date_not_allowed=false
    this.time_not_allowed=false
  var data={
    title:this.myForm.get("taskname").value,
    dt:final,
    status:false
  }
  this.task.addtask(data).subscribe(
    res=>{ this.gettask() },
    err=>console.log(err)
  )
  }
} 
}
