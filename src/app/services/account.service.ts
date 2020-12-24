import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Page } from '../models/page.model';
import { Account } from '../models/account.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseService {
  constructor(router: Router, private httpClient: HttpClient) {
    super(router);
    this.baseUrl = this.baseUrl + 'accounts';
  }

  getAll(queryParams: Page): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl +
          `?pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`,
        this.getHttpHeader()
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get<Account>(this.baseUrl + `/${id}`, this.getHttpHeader())
      .pipe(retry(3), catchError(this.handleError));
  }

  addAccount(data: Account): Observable<any> {
    return this.httpClient
      .put<any>(this.baseUrl, JSON.stringify(data), this.getHttpHeader())
      .pipe(retry(3), catchError(this.handleError));
  }

  updateAccount(id: string, data: Account): Observable<any> {
    return this.httpClient
      .post<any>(
        this.baseUrl + '/' + id,
        JSON.stringify(data),
        this.getHttpHeader()
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteAccount(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + '/' + id, this.getHttpHeader())
      .pipe(retry(3), catchError(this.handleError));
  }
}
