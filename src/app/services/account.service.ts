import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Page } from '../models/page.model';
import { Account } from '../models/account.model';
import { environment } from 'src/environments/environment';
import { httpHeader } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl: string = environment.api_url + 'accounts';

  constructor(private httpClient: HttpClient) {}

  getAll(queryParams: Page): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl +
          `?pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`,
        httpHeader
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get<Account>(this.baseUrl + `/${id}`, httpHeader)
      .pipe(retry(3), catchError(this.handleError));
  }

  addAccount(data: Account): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl, JSON.stringify(data), httpHeader)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateAccount(id: string, data: Account): Observable<any> {
    return this.httpClient
      .put<any>(this.baseUrl + '/' + id, JSON.stringify(data), httpHeader)
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteAccount(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + '/' + id, httpHeader)
      .pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
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
}
