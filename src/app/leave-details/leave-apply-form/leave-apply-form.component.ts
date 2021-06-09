import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITaskTypeOption } from '../../../interface/task';
import { TaskService } from '../../service/task.service';

@Component({

  templateUrl: './leave-apply-form.component.html',

})
export class LeaveApplyFormComponent implements OnInit {

  taskForm: FormGroup;
  typeOption: Array<ITaskTypeOption> = [];

  constructor(private fb: FormBuilder, private leaveService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.typeOption = this.leaveService.getTypeOptions();
  }

  addTask() {
    console.log(this.taskForm.value);
    this.leaveService.postTaskList(this.taskForm.value).subscribe((d) => {
      console.log(d);
      this.router.navigate(['trainer/leave-list']);
    },
      (error) => {
        console.error(error);
      }
    );
  }

}
