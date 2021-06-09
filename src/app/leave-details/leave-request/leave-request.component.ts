import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from '../../../interface/task';
import { LeaveInfo } from '../../auth/leave-info';
import { LeaveService } from '../../service/leave.service';



@Component({

  templateUrl: './leave-request.component.html',

})
export class LeaveRequestComponent implements OnInit {

  leaves: LeaveInfo[];
  pageOfItems: Array<any>;
  searchValue: string;
  tasks: Observable<Array<ITask>>;
  p: number = 1;

  constructor(private router: Router, private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasks = this.leaveService.getLeavesPending();
    this.leaveService.getLeavesPending().subscribe((d) => {
      console.log(d);
      this.leaves = d;
    })
  }

  getLeaveForm(id: string) {
    console.log(id);
    this.router.navigate(['manager/leave-response-form', id]);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
