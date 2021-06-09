import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({

  templateUrl: './leave-request.component.html',

})
export class LeaveRequestComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getLeaveForm(){
    this.router.navigate(['manager/leave-response-form']);
  }
  
}
