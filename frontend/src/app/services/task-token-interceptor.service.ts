import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TaskService } from './task.service';
@Injectable({
  providedIn: 'root'
})
export class TaskTokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector){}
  intercept(req, next) {
  //  let authService = this.injector.get(AuthService)
    let taskService=this.injector.get(TaskService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + taskService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }
}
