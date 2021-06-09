import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  authority: string;
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

  }
  onSubmit() {
    console.log(this.form);
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.roles);
        this.roles.every(role => {
          if (role['authority'] === 'ROLE_MANAGER') {
            this.authority = 'manager';
            this.router.navigate(['/manager']);
          } else if (role['authority'] === 'ROLE_DEPMANAGER') {
            this.authority = 'depmanager';
          }
          else {
            this.authority = 'trainer';
            this.router.navigate(['/trainer']);
          }

        });


      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        //alert("Login failed");
        Swal.fire({
          title: 'Invalid Login',
          text: 'Login Failed',
          icon: 'error'
        });
      }
    );

  }
}
