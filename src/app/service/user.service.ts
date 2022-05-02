import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<User>(`http://127.0.0.1:8000/api/v1/users`)
      .pipe(
        map((response) => response),
        catchError(this.errorHandler)
      );
  }

  // Gestione Errori
  errorHandler(error: any) {
    console.log(error);
    let msg: string;

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = "Applicazione Offline!";
      } else {
        msg = `Ops, si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }
}
