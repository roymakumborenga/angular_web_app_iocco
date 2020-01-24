import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// import models
// import { Person } from './models/person';
// import { Employee } from './models/employee';

// Declare api url. Can declare. add url to config instead after testing
// Using proxy here as CORS not enabled on target API
const apiBaseUrl = 'api/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // http CRUD operations
  // POST
  CreateItem(item, entity): Observable<any> {
    return this.http.post(apiBaseUrl + entity, JSON.stringify(item), this.httpOptions);
  }

  // GET
  GetItem(id, entity): Observable<any> {
    return this.http.get(apiBaseUrl + entity + '/' + id);
  }
  GetItems(entity): Observable<any> {
    return this.http.get(apiBaseUrl + entity);
  }
  // PUT
  UpdateItem(id, item, entity): Observable<any> {
    return this.http.put(apiBaseUrl + entity + '/' + id, JSON.stringify(item), this.httpOptions);
  }

  // DELETE
  DeleteItem(id, entity): Observable<any>{
    return this.http.delete(apiBaseUrl + entity + '/' + id, this.httpOptions);
  }

}
