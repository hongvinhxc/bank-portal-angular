import { Injectable } from '@angular/core';
import { getToken, parseToken } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = getToken();
    if (!token) return false;

    const payload = parseToken();
    if (Date.now() >= payload.exp * 1000) {
      return false;
    }

    return true;
  }
}
