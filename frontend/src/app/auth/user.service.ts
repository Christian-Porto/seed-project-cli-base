import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000";
  private userNameSubject = new BehaviorSubject<string>(localStorage.getItem('userFirstName') || 'unknown');
  userNameObservable = this.userNameSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string>(localStorage.getItem('userId') || 'unknown');
  userIdObservable = this.userIdSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  updateUserLoginDetails(userId: string, userFirstName: string) {
    this.userNameSubject.next(userFirstName);
    this.userIdSubject.next(userId);
  }

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

  signinUser(user: User): Observable <void> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/signin`, user).pipe(
      catchError((error) => this.errorHandler(error, "signinUser()"))
    );
  }
}
