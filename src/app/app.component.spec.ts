import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UserManagementComponent } from './user-management/user-management/user-management.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EmployeeComponent } from './employee/employee/employee.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, AppModule
      ],
      declarations: [
        AppComponent,  UserManagementComponent, NavbarComponent, EmployeeComponent
      ],
    }).compileComponents();
  }));

 /* it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }); */
});
