import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingSession } from '../../class/training-session';
import { TrainingSessionService } from '../../service/training-session.service';
import { TrainingCordinator } from '../../class/training-cordinator';
import { GeneralService } from '../../service/general.service';


@Component({

  templateUrl: './update-training-session.component.html',

})
export class UpdateTrainingSessionComponent implements OnInit {


  id: number;
  trainingSession: TrainingSession = new TrainingSession();
  trainingCordinators:any;
  trainingLocations : any;
  trainingRooms: any;

  constructor(
    private trainingSessionService: TrainingSessionService,
    private route: ActivatedRoute,
    private router: Router,
    private generalService : GeneralService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.trainingSessionService.getTrainingSessionById(this.id).subscribe(data => {
      this.trainingSession = data;
      console.log(this.trainingSession); 
    }, error => console.log(error));

    this.generalService.getAlltrainerCordinators().subscribe(data=>{
      this.trainingCordinators = data; 
    });

    this.generalService.getAlllocations().subscribe(data=>{
      this.trainingLocations =data;
    });

    this.generalService.trainingRooms().subscribe(data=>{
      this.trainingRooms =data;
    });

  }

  onSubmit() {
    
    this.trainingSessionService.updateTrainingSession(this.id, this.trainingSession).subscribe(data => {
      console.log(data);
      alert("Training Session Updated!");

      //this.goToTrainingSessionList();
    }, error => console.log(error));
  }

}
