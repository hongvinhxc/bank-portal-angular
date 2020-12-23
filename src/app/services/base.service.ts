import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { getToken } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected baseUrl = environment.api_url;

  constructor(protected router: Router) {
    this.handleError = this.handleError.bind(this);
  }

  protected getHttpHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getToken(),
      }),
    };
  }

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status == 401) {
        this.router.navigate(['/login']);
      }
    }
    return throwError(errorMessage);
  }
}
