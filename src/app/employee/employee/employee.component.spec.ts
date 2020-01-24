import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeComponent } from './employee.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ApiService} from '../../api.service';
import {Employee} from '../../models/employee';
import {Person} from '../../models/person';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ],
      imports: [DataTablesModule, FormsModule, NgbModule, HttpClientModule],
      providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should do something', () => {
    const spyOnMethod = spyOn(component, 'resetDate').and.callThrough();
    // act
    component.onSubmit();
    // assert
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
