import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string) {
    return this.http.post(`${environment.apiUrl}/user/register`, {
      username: username,
      password: password,
      email: email
    })
    .pipe(map(user => {
      return user;
    }));
  }
}
