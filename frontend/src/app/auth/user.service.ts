import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  errorHandler(error: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: error,
      error_CS: "Client-Side: errorHandler: Ocorreu um erro!" 
    })
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/signup`, user).pipe(
      catchError((error) => this.errorHandler(error, "addUser()"))
    );
  }
}
