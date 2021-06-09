import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';
import { TrainingSession } from '../../class/training-session';
import { VirtualMachine } from '../../class/virtual-machine';
import { TrainingSessionService } from '../../service/training-session.service';
import { VirtualMachineService } from '../../service/virtual-machine.service';

@Component({
  templateUrl: './training-session-details.component.html',
})

export class TrainingSessionDetailsComponent implements OnInit {

  id: number;
  trainingSession: TrainingSession;
  tentativeVirtualMachines: any;
  freeVirtualMachines: any;
  start_Date: Date;

  virtualMachineId: number = 0;
  virtualMachineIds: number[] = [];
  virtualMachines: VirtualMachine[] = [];

  tempvm: VirtualMachine;

  tempProduct: String;
  duration: number;

  roles: string[];
  authority: string;


  constructor(private route: ActivatedRoute, private tokenStorage: TokenStorageService, private trainingSessionService: TrainingSessionService, private virtualMachineService: VirtualMachineService, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role['authority'] === 'ROLE_MANAGER') {
          this.authority = 'manager';
        } else if (role['authority'] === 'ROLE_DEPMANAGER') {
          this.authority = 'depmanager';
        }
        else {
          this.authority = 'trainer';
        }
      });
    }


    this.id = this.route.snapshot.params['id'];
    this.trainingSession = new TrainingSession();
    this.trainingSessionService.getTrainingSessionById(this.id).subscribe(data => {
      this.trainingSession = data;
    });

    this.virtualMachineService.getVirtualMachineByTrainingSessions(this.id).subscribe(data => {
      this.tentativeVirtualMachines = data;

    });

    this.start_Date = this.trainingSession.startDate;

  }

  saveTrainingSession() {
    this.trainingSessionService.updateTrainingSessionVm(this.id, this.trainingSession).subscribe(data => {
      console.log(data);
      this.goToTrainingSessionList();
    },
      error => console.error(error));
  }

  goToTrainingSessionList() {
    this.router.navigate(['/trainer/training-session-list']);
  }

  addVm() {
    this.virtualMachineService.getVirtualMachinebyId(this.virtualMachineId).subscribe(data => {
      this.virtualMachineIds.push(this.virtualMachineId);
      this.tempvm = data;
      this.virtualMachines.push(this.tempvm);
      this.trainingSession.virtualMachines.push(this.tempvm);
      console.log(data);
      console.log("virtual machines Ids" + this.virtualMachineIds);
    },
      error => console.error(error));

  }

  getAvailableVM() {
    this.tempProduct = this.trainingSession.ifsApplicationVersion;
    this.duration = this.trainingSession.duration;
    console.log(this.tempProduct);
    console.log(this.trainingSession.startDate)
    this.virtualMachineService.getAvailableVirtualMachineList(this.trainingSession.startDate, this.tempProduct, this.duration).subscribe(data => {
      this.freeVirtualMachines = data;

    },
      error => console.error(error));
  }



  allocateVMs() {
    console.log(this.virtualMachineIds);
    console.log(this.trainingSession.virtualMachines);
    this.trainingSession.vmIds = this.virtualMachineIds;
    this.trainingSession.virtualMachines = this.virtualMachines;
    console.log(this.trainingSession.vmIds);
    console.log(this.trainingSession.virtualMachines);
    this.saveTrainingSession();

  }

}
