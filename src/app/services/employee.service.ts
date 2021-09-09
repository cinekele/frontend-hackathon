import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiBaseUrl + '/api/employees'


  constructor(private http: HttpClient) { }

  public getBoss(): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }

  public downloadCSV(): Observable<void> {
    return this.http.get<void>(this.apiUrl + "/export/csv");
  }
}
