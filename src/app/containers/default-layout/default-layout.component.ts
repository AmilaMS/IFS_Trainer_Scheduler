import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';


interface Info {
  token: string;
  username: string;
  authorities: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  info: Info;

  constructor(private token: TokenStorageService,private router:Router) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    const token = this.token.getToken();
    const username = this.token.getUsername();
    const authorities = this.token.getAuthorities();
    this.info = {
      token: token,
      username: username,
      authorities: authorities
    };
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
    //window.location.reload();
    

  }
}
