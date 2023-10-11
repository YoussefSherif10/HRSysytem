import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "src/models/Employee";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("/api/employees");
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>("/api/employees/" + id);
  }

  updateEmployee(id: string, newData: any): Observable<Employee> {
    return this.http.put<Employee>("/api/employees/" + id, newData);
  }

  createEmployee(newData: any): Observable<Employee> {
    return this.http.post<Employee>("/api/employees", newData);
  }

  login(email: string): Observable<any> {
    return this.http.post<any>("/api/login", { email });
  }
}
