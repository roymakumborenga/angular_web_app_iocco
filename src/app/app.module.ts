import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error-handling/http-error-interceptor';

import {ApiService} from './api.service';
import { UserManagementComponent } from './user-management/user-management/user-management.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeComponent } from './employee/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    NavbarComponent,
    EmployeeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    // ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    ApiService, // single service across component instances
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
