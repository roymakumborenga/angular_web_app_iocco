import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {ApiService} from '../../api.service';
import {Employee} from '../../models/employee';
import {Person} from '../../models/person';
import { catchError } from 'rxjs/operators';
import { stringify } from 'querystring';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public apiService: ApiService, private modalService: NgbModal, private calendar: NgbCalendar) { }

  employees = [];
  loadCheck = false;
  dtOptions: DataTables.Settings = {};
  employeeObj: Employee = new Employee();
  personObj: Person = new Person();
  model: NgbDateStruct;

  ngOnInit() {
    this.getComponentData();
  }

   onSubmit() {
      // adjust date fields
      this.resetDate(this.employeeObj);
      this.resetDate(this.personObj);

      if (isNaN(this.personObj.personId) && isNaN(this.employeeObj.employeeId)) { // non existing item. Post person
        // generate ids
        this.personObj.personId = parseInt(this.generateId('People'), 10);
        // save person
        this.apiService.CreateItem(this.personObj, 'People').subscribe((data) => {
          this.employeeObj.employeeId = parseInt(this.generateId('Employees'), 10);
          this.employeeObj.personId = this.personObj.personId;
          console.log(this.employeeObj);
          // save employee if person success
          this.apiService.CreateItem(this.employeeObj, 'Employees').subscribe((dataE) => {
            alert('Action was completed successfully');
            // preferable to have a more user friendly refressh mechanism like dynamic loading
            location.reload();
          });
        });


      } else { // Existing. PUT
        this.apiService.UpdateItem(this.personObj.personId, this.personObj, 'People').subscribe((data) => {
          this.apiService.UpdateItem(this.employeeObj.employeeId, this.employeeObj, 'Employees').subscribe((data) => {
            alert('Action was completed successfully');
            location.reload();
          });
        });
      }
   }

   //will need to redo the http interceptor to allow 404 to create a more sensible id generator
   // by checking database fo non existent keys instead
  private generateId(entity){
    let crntDate = new Date();
    let idCheck = true;
    let i = 0;
    let id = '';
    try {
    // while (idCheck && i < 10) {
      id = crntDate.getFullYear().toString() + (crntDate.getMonth() + 1).toString() + crntDate.getDate().toString() +
      (Math.floor(100 + Math.random() * 900)).toString() ;
    //  this.apiService.GetItem(id, entity).subscribe((data) => {
    //  idCheck = false;
   // });
    // i++;
    // }
    // if (!idCheck) { //valid id found
      return id;
  // }
  } catch (ex) {
  console.log(ex);
  }
    return '';
  }

  private getComponentData() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10
      // processing: true
    };

    this.getAllEmployees();
  }

  private resetDate(object) {
    for (let key of Object.keys(object)) {
      if (key.includes('Date')) {
        try {
          if ( object[key] != null &&  object[key] != ''){
          object[key] = (object[key].year + '-' + (object[key].month < 10 ? '0' + object[key].month : object[key].month)
         + '-' + object[key].day); } else {  object[key] = ''} } catch (ex) { // log error
        } finally {}
      }
    }
    // return null;
  }
    getAllEmployees() {
      this.apiService.GetItems('Employees').subscribe((data) => {
        this.employees = data;
        this.loadCheck = true;
      });
    }
    getPerson(Id) {
      this.apiService.GetItem(Id, 'People').subscribe((data) => {
        this.personObj = data;

        for (let key of Object.keys(this.personObj)) {
          if (key.includes('Date')) {
           let dateVar = new Date(data.birthDate);
           console.log(dateVar);
           this.personObj[key] = {year: dateVar.getFullYear(), month: dateVar.getMonth() + 1, day: dateVar.getDate()};
          }

          // special exception
          // document.getElementById('birthDateLb').va
        }
      });
    }

    onSelectedEmployee(employee: Employee): void {
      this.resetForm();
      for (let key of Object.keys(employee)) {
        if (key.includes('Date')) {
         if(employee[key] != null) {
          let dateVar = new Date(employee[key]);
          this.employeeObj[key] = {year: dateVar.getFullYear(), month: dateVar.getMonth() + 1, day: dateVar.getDate()};}
        } else {
          this.employeeObj[key] = employee[key];
        }
      }
      this.getPerson(employee.personId);
      // this.modalService.open(content, { size: 'lg' });
    }
  onSelectedEdit(content): void {
    this.modalService.open(content, { size: 'lg' });
  }
  onSelectedAdd(content): void {
    this.resetForm();
    this.modalService.open(content, { size: 'lg' });
  }
  onDeleteItem(content): void {
    this.modalService.open(content, { size: 'sm' });
  }
  onDeleteItemConfirm(): void {
    console.log(this.employeeObj);
    this.apiService.DeleteItem(this.employeeObj.employeeId, 'Employees').subscribe((data) => {
      this.apiService.DeleteItem(this.employeeObj.personId, 'People').subscribe((dataE) => {
        location.reload();
      });
    });
  }
  resetForm() {
    this.employeeObj = new Employee();
    this.personObj = new Person();
  }
   isDate(date) {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }
}
