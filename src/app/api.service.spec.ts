// Write test cases for the HTTP client.
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { of } from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
describe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a collection of employees', () => {
    const employeeResponse = [
      {
        employeeId: 2,
        personId: 5,
        employeeNumber: 'GNH545',
        employedDate: '2020-01-24T22:05:20.828Z',
        terminatedDate: '2020-01-24T22:05:20.828Z'
      },
      {
        employeeId: 3,
        personId: 6,
        employeeNumber: 'GNH585',
        employedDate: '2020-01-24T22:05:20.828Z',
        terminatedDate: ''
      }
    ];
    let response;
    spyOn(service, 'GetItems').and.returnValue(of(employeeResponse));

    service.GetItems('Employees').subscribe(res => {
      response = res;
    });

    expect(response).toEqual(employeeResponse);
  });

  it('should return a single employee', () => {
    const id = 5;
    const employeeResponse = {
        employeeId: 2,
        personId: 5,
        employeeNumber: 'GNH545',
        employedDate: '2020-01-24T22:05:20.828Z',
        terminatedDate: '2020-01-24T22:05:20.828Z'
      };
    let response;
    spyOn(service, 'GetItem').and.returnValue(of(employeeResponse));

    service.GetItem(id, 'Employees').subscribe(res => {
      response = res;
    });

    expect(response).toEqual(employeeResponse);
  });

  it('should delete employee', () => {
    const id = 5;
    let response;
    spyOn(service, 'DeleteItem').and.returnValue(of(''));

    service.DeleteItem(id, 'Employees').subscribe(res => {
      response = res;
    });

    expect(response).toEqual('');
  });
});
