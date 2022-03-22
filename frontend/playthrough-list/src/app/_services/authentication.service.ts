import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser?: Observable<User>;
  private _isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!!));
      this._isLoggedIn = true;
    } else {
      this._currentUserSubject = new BehaviorSubject<User>(new User);
      this._isLoggedIn = false;
    }
    
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login(username:string, password:string) {
    
    return this.http.post<any> (
      `${environment.apiUrl}/user/login`, 
      { username, password }
    ).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._currentUserSubject.next(user);
      this._isLoggedIn = true;
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(new User);
    this._isLoggedIn = false;
  }
}
