import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData, SignUpData } from 'src/data-type';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public menutype:string="{{authRole}}@Input()";
  authRole: string = 'user';
  showLogin: boolean = true;
  errorMessage: string = '';
  LoginerrorMessage: string = '';


  SignUpData: SignUpData = {
    email: '',
    password: '',
    role: '',
    name: ''
  };

  loginData: LoginData = {
    email: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router) {
    // Check if the user or seller is already logged in
    if (this.authService.currentUserValue || this.authService.currentSellerValue) {
      if (this.authService.currentSellerValue) {
        this.router.navigate(['/seller-Home']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  signup() {
    this.SignUpData.role = this.authRole;
    this.authService.signup(this.SignUpData, this.authRole).subscribe(
      result => {
        // Handle successful signup
        console.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
        }

      },
      error => {
        // Handle signup error
        console.log(error);
        if (error.status === 400 && error.error === environment.errorMessage.ExisterrorMessage) {
          // Display error message for duplicate email
          this.errorMessage=environment.errorMessage.ExisterrorMessage;
          //Swal.fire('Error', this.errorMessage, 'error');
        } else {
          // Display a generic error message
          this.errorMessage=environment.errorMessage.SignUperrorMessage;
          //Swal.fire('Error', this.errorMessage, 'error');
        }
      }
    );
  }

  adminLogin(){
    this.loginData.role = this.authRole;
    this.authService.login(this.loginData, this.authRole).subscribe(
      result => {
       
        if (this.authRole === 'seller') {
          this.router.navigate(['/seller-Home']);
          console.warn(localStorage.getItem('seller'))
        }


      },
      error => {
        
        console.log(error);
        if (error.status === 401 && error.error === environment.errorMessage.InvaliderrorMessage) {
          
          this.LoginerrorMessage=environment.errorMessage.InvaliderrorMessage;
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        } else {
          // Display a generic error message
          this.LoginerrorMessage =environment.errorMessage.LoginerrorMessage;
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        }
      }
    );


  }

  login() {
    this.loginData.role = this.authRole;
    this.authService.login(this.loginData, this.authRole).subscribe(
      result => {
        // Handle successful login
        console.log(result);
        if (this.authRole === 'user') {
          this.router.navigate(['/']);
          console.warn(localStorage.getItem('seller'))
        }


      },
      error => {
        
        console.log(error);
        if (error.status === 401 && error.error === environment.errorMessage.InvaliderrorMessage) {
          this.authRole="seller"
          this.adminLogin();
          // Display error message for invalid email or password
          this.LoginerrorMessage=environment.errorMessage.InvaliderrorMessage;
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        } else {
          // Display a generic error message
          this.LoginerrorMessage =environment.errorMessage.LoginerrorMessage;
          //Swal.fire('Error', this.LoginerrorMessage, 'error');
        }
      }
    );
  }
  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
