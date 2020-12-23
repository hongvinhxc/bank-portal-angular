import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  constructor(router: Router ,private httpClient: HttpClient) {
    super(router);
    this.baseUrl = this.baseUrl + "login";
  }

  login(formData: User): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl, formData)
      .pipe(retry(3), catchError(this.handleError));
  }
}
