import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class AuthGuardService  implements CanActivate {

  constructor(private router: Router
    , private authService: AuthService) { }

    canActivate() {
      
      if (this.authService.isAuthenticated()) {
          
          return true;
      }

     
      this.router.navigate(['/403']);
      return false;
  }
}
