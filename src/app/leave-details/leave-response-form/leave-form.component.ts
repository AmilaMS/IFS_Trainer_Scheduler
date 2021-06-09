import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask, ITaskTypeOption } from '../../../interface/task';
import { TaskService } from '../../service/task.service';

@Component({
  templateUrl: './leave-form.component.html',
})
export class LeaveFormComponent implements OnInit {

  id: string;
  itask: any;
  taskForm: FormGroup;
  typeOption: Array<ITaskTypeOption> = [];

  constructor(
    private leaveService: TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.leaveService.getLeaveById(this.id).subscribe(data => {
      this.itask = data;
      console.log(this.itask)
    }, error => console.log(error));

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.showTask();
  }

  showTask() {
    this.leaveService.getLeaveById(this.id).subscribe(
      (d: ITask) => {
        //console.log(d);
        this.taskForm.controls['title'].setValue(d.title);
        this.taskForm.controls['type'].setValue(d.type);
        this.taskForm.controls['date'].setValue(d.date);
        this.taskForm.controls['description'].setValue(d.description);
      }, (error) => console.error(error)
    );
  }

  updateLeaveStatus() {
    this.taskForm.value;
    this.leaveService
      .updateStatus(this.taskForm.value, this.id)
      .subscribe((d) => {
        console.log(d);
        this.router.navigate(['manager/leave-request']);
      }, error => console.error(error)
      );
  }



}
