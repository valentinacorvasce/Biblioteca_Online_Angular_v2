import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url!: string;
  private options: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:8000/api/v1/login';
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/api/v1/register`, user)
      .pipe(
        map((response) => response),
        catchError(this.errorHandler)
      );
  }

  login(datiForm): Observable<string> {
    const body = this.body(datiForm);
    return this.http.post(this.url, body, { headers: this.options })
      .pipe(
        map(res => {
          if (res['token']) {
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorHandler)
      );
  }

  private setSession(jwt: string) {
    let expired: number = new Date().getTime() + 60000 * 60;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expire', expired.toString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }

  private body(df: NgForm) {
    let param = new HttpParams()
      .set('email', df.value.email)
      .set('password', df.value.password);
    return param;
  }

  notExpired(): boolean {
    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire'));
      return new Date().getTime() < expire;
    }
    return false;
  }

  checkDir(): string {
    if (this.notExpired()) {
      return 'book/';
    }
    return '';
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


