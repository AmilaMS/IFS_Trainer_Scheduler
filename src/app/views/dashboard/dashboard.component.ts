import { Component, OnInit } from '@angular/core';

import { LeaveInfo } from '../../auth/leave-info';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';



interface Info {
  token: string;
  username: string;
  authorities: string[];
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //leaves: LeaveInfo[];
  //bgHome;

  info: Info;
  authority: string;

  constructor(private router: Router,private token: TokenStorageService) { }
  // lineChart1

  ngOnInit(): void {
    const token = this.token.getToken();
    const username = this.token.getUsername();
    const authorities = this.token.getAuthorities();
    this.info = {
      token: token,
      username: username,
      authorities: authorities
    };

    this.info.authorities.every(role => {
      if (role['authority'] === 'ROLE_MANAGER') {
        this.authority = 'manager';
      }
    });
  }
  /*getTaskCounts() {
    this.leaveService.getLeaveCount().subscribe(data => {
      console.log(data);
      this.bgHome = data;
    });
  }*/
  getToLeaveRequestList() {
    this.router.navigate(['manager/leave-request']);
  }
  getToCreateTrainingSessions() {
    this.router.navigate(['manager/create-training-session']);
  }
  getToVirtualMachine() {
    if(this.authority === 'manager'){
      this.router.navigate(['manager/virtual-machine-list']);
    }
    else{
      this.router.navigate(['trainer/virtual-machine-list']);
    }
    
  }
  getToTrainerLists() {
    this.router.navigate(['manager/trainer-list']);
  }

  getToTrainingSessionList(){
    this.router.navigate(['trainer/training-session-list']);
  }
}