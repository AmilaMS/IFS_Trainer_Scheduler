import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from '../../../interface/task';
import { TaskService } from '../../service/task.service';

@Component({

  templateUrl: './leave-list.component.html',
})
export class LeaveListComponent implements OnInit {

  tasks: ITask[];
  pageOfItems: Array<any>;
  p: number = 1;
  constructor(private router: Router, private leaveService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.leaveService.getTaskList().subscribe((d) => {
      console.log(d);
      this.tasks = d;
    })
  }

  updateLeaveApplyForm(id: string) {
    console.log(id)
    this.router.navigate(['trainer/update-leave-apply-form', id]);
  }

  deleteLeaveApplyForm(id: string) {
    this.leaveService
      .deleteTask(id)
      .subscribe((d) => {
        this.getTasks();
      }, error => console.error(error)
      );
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
