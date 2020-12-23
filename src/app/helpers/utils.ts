import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': getToken(),
  }),
};

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
