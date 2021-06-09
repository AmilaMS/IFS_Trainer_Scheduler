import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../service/trainer.service';
import { Trainer } from '../../class/trainer';


@Component({
  
  templateUrl: './trainer-list.component.html',
  
})
export class TrainerListComponent implements OnInit {

  trainers: Trainer[];
  trainerQualifications :any;

  constructor(private trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    this.trainerService.getTrainerList().subscribe(data => {
      this.trainers = data;
    });
  }

  updateTrainerDetails(){
    this.router.navigate(['/manager/update-trainer']);
  }

}
