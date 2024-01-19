import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginData, SignUpData } from 'src/data-type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  isUserLoggedIn= new BehaviorSubject<boolean>(false);
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<any | null>;
  private currentSellerSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;
  public currentSeller: Observable<any | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any | null>(this.getUserFromLocalStorage('user'));
    this.currentSellerSubject = new BehaviorSubject<any | null>(this.getUserFromLocalStorage('seller'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentSeller = this.currentSellerSubject.asObservable();
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  public get currentSellerValue(): any | null {
    return this.currentSellerSubject.value;
  }

  private getUserFromLocalStorage(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private updateUserInLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  signup(data: SignUpData, userType: string) {
    return this.http.post<any>(`${this.baseUrl}/Authentication`, data).pipe(
      map(user => {
        // Store user details and JWT token in local storage
        const key = userType === 'seller' ? 'seller' : 'user';
        const userData = { token: user.token, name: user.name, id: user.id };
        this.updateUserInLocalStorage(key, userData);

        if (userType === 'seller') {
          this.currentSellerSubject.next(userData);
        } else {
          this.currentUserSubject.next(userData);
        }

        return user;
      })
    );
  }

  login(data: LoginData, userType: string) {
    return this.http.post<any>(`${this.baseUrl}/Authentication/login`, data).pipe(
      map(user => {
        // Store user details and JWT token in local storage
        const key = userType === 'seller' ? 'seller' : 'user';
        const userData = { token: user.token, name: user.name, id: user.id };
        this.updateUserInLocalStorage(key, userData);

        if (userType === 'seller') {
          this.currentSellerSubject.next(userData);
        } else {
          this.currentUserSubject.next(userData);
        }

        return user;
      })
    );
  }

  logout(userType: string) {
    // Remove user details and JWT token from local storage
    const key = userType === 'seller' ? 'seller' : 'user';
    localStorage.removeItem(key);

    if (userType === 'seller') {
      this.currentSellerSubject.next(null);
    } else {
      this.currentUserSubject.next(null);
    }

    this.router.navigate(['/auth']);
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-Home'])
    }
  }

  reloadUser(){
    if(localStorage.getItem('User')){
      this.isUserLoggedIn.next(true)
      this.router.navigate(['/'])
    }
  }
}
