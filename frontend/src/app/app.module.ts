import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './component/task/task.component';
import { ComponentComponent } from './component/component.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RegisterComponent } from './component/register/register.component';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TaskTokenInterceptorService } from './services/task-token-interceptor.service';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './component/notification/notification.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule } from "@angular/material/sidenav";
import { NotifcationService } from './services/notification.service';
import { SidenavService } from './services/sidenav.service';
const material=[MatSidenavModule]
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ComponentComponent,
    LoginComponent, 
    RegisterComponent, NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatBadgeModule
  ],
  providers: [AuthService,TaskService,AuthGuard,DatePipe,NotifcationService,SidenavService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: TaskTokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
