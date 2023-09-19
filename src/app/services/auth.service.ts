import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {TokenDTO} from "../dtos & forms/tokenDTO";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dtos & forms/LoginDTO";
import {passwordForm} from "../dtos & forms/passwordForm";
import {UserRole} from "../enums/userRole";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string='http://localhost:8080'
  private loggedInSubject : BehaviorSubject<TokenDTO |undefined >;
  constructor(
    private http:HttpClient
  ) {
    this.loggedInSubject = new BehaviorSubject<TokenDTO | undefined>(this.authData)
  }

  login(loginForm: LoginDTO) {
    return this.http.post<TokenDTO>(`${this.apiUrl}/auth/login`, loginForm).pipe(
      tap( data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.loggedInSubject.next(data);
      })
    );
  }

  changePassword(passwordDto : passwordForm){
    return this.http.patch(`${this.apiUrl}/auth/password`,passwordDto )
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  isLoggedInObservable(): Observable<TokenDTO | undefined> {
    return this.loggedInSubject.asObservable();
  }
  logout() {
    localStorage.removeItem('user');
    this.loggedInSubject.next(undefined);
  }

  get authData(): TokenDTO | undefined{
    const authDataString = localStorage.getItem('user');
    if(authDataString)
      return JSON.parse(authDataString) as TokenDTO

    return undefined
  }

  get username() {
    return this.authData?.user?.username
  }

  get isConnected(): Observable<boolean> {
    return this.loggedInSubject.asObservable().pipe(
      map( data => data !== undefined )
    )
  }

  isAdmin(): boolean {
    const role = this.authData?.user?.role;
    return role === UserRole.Admin;
  }


}
