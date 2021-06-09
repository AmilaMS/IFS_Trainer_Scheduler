import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({

  templateUrl: './leave-list.component.html',
})
export class LeaveListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateLeaveApplyForm(){
    this.router.navigate(['trainer/update-leave-apply-form']);
  }  
}
