import { Component, OnInit,HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './auth/token-storage.service';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {

  roles: string[];
  authority: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role['authority'] === 'ROLE_MANAGER') {
          this.authority = 'manager';
        } else if (role['authority'] === 'ROLE_DEPMANAGER') {
          this.authority = 'depmanager';
        }
        else {
          this.authority = 'trainer';
        }

      });
    }
  }
}
