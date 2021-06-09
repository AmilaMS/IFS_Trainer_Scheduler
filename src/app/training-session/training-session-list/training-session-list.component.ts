import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';
import { TrainingSessionService } from '../../service/training-session.service';
import { SortRequestTrainingSessions } from '../../class/sort-request-training-sessions';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

interface Info {
  token: string;
  username: string;
  authorities: string[];
}

@Component({

  templateUrl: './training-session-list.component.html',

})
export class TrainingSessionListComponent implements OnInit {

  roles: string[] = [];
  authority: string;
  info: Info;
  trainingSessions: any;

  filterForm: FormGroup;
  startDate?: Date;
  deliveryMethod?: String;
  ifsVersion?: String;

  requestBody: SortRequestTrainingSessions;
  sortedTrainingSessions: SortRequestTrainingSessions = new SortRequestTrainingSessions();

  constructor(private trainingSessionService: TrainingSessionService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    const token = this.token.getToken();
    const username = this.token.getUsername();
    const authorities = this.token.getAuthorities();
    this.info = {
      token: token,
      username: username,
      authorities: authorities
    };

    this.roles = this.token.getAuthorities();
    this.getTrainingSessions();
  }

  private getTrainingSessions() {

    console.log(this.roles);
    this.roles.every(role => {
      if (role['authority'] === 'ROLE_MANAGER') {
        this.authority = 'manager';
        this.trainingSessionService.getTrainingSessionList().subscribe(data => {
          console.log(data);
          this.trainingSessions = data;
        });
      } else if (role['authority'] === 'ROLE_DEPMANAGER') {
        this.authority = 'depmanager';
      }
      else {
        this.authority = 'trainer';
        this.trainingSessionService.getTrainingSessionListByTrainer(this.info.username).subscribe(data => {
          this.trainingSessions = data;
        });
      }

    });

  }

  getTrainingSessionDetails(id: number) {
    // if(this.auth="trainer")
    if (this.authority == 'trainer')
      this.router.navigate(['trainer/training-session-details', id]);
    else
      this.router.navigate(['manager/training-session-details', id]);
  }

  updateTrainingSession(id: number) {
    if (this.authority == 'trainer')
      this.router.navigate(['trainer/update-training-session', id]);
    else
      this.router.navigate(['manager/update-training-session', id]);
  }

  deleteTrainingSession(id: number) {
    Swal.fire({
      title: 'Delete a training session ?',
      text: 'No recovery is available',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        console.log('Clicked Yes, Session Deleted deleted!');
        this.trainingSessionService.deleteTrainingSession(id).subscribe(data => {
          console.log(data);
          this.getTrainingSessions();
        })

      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
        this.getTrainingSessions();
      }
    })

    //alert("Want to delete a Training Session ?");


  }


  onSubmit() {
    this.requestBody = {
      startDate: this.startDate,
      deliveryMethod: this.deliveryMethod,
      ifsVersion: this.ifsVersion
    };

    console.log(this.requestBody);
    this.trainingSessionService.getSortedTrainingSessions(this.requestBody).subscribe(data => {
      this.trainingSessions = [];
      this.trainingSessions = data;
    })

  }

  goBackToPrev() {
    console.log("clear");
    this.getTrainingSessions();
  }
}
