import { Component, OnInit } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../api.service';
import {Person} from '../../models/person';
import {Employee} from '../../models/employee';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(public apiService: ApiService, private modalService: NgbModal, private calendar: NgbCalendar) { }
  people = [];
  employees = [];
  loadCheck = false;
  dtOptions: DataTables.Settings = {};
  personObj: Person = new Person();
  employeeObj: Employee = new Employee();
  model: NgbDateStruct;
  ngOnInit() {
    this.getComponentData();
  }
  private getComponentData() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5
      // processing: true
    };

    this.getAllPeople();
  }

    getAllPeople() {
      this.apiService.GetItems('People').subscribe((data) => {
        this.people = data;
        this.loadCheck = true;
      });
    }
    getEmployee(Id) {
      this.apiService.GetItem(Id, 'Employees').subscribe((data) => {
        this.employeeObj = data;
      });
    }

    onSelectedPerson(person: Person): void {
    console.log(person);
    for (let key of Object.keys(person)) {
      if (key.includes('Date')) {
       let dateVar = new Date(person[key]);
       // this.personObj[key] = dateVar.getFullYear() + ' ' + (dateVar.getMonth() + 1) + ' ' + dateVar.getDate();
       this.personObj[key] = {year: dateVar.getFullYear(), month: dateVar.getMonth() + 1, day: dateVar.getDate()};
      } else {
        this.personObj[key] = person[key];
      }

    }

    this.getEmployee(person.personId);
    // this.modalService.open(content, { size: 'lg' });
  }
  onSelectedEdit(person: Person, content): void {
    this.modalService.open(content, { size: 'lg' });
  }
   isDate(date) {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }
}
