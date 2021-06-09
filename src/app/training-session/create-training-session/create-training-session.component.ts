import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingSession } from '../../class/training-session';
import { TrainingSessionService } from '../../service/training-session.service';
import { GeneralService } from '../../service/general.service';
import { VirtualMachineService } from '../../service/virtual-machine.service';

import { TrainerService } from '../../service/trainer.service';
import { Trainer } from '../../class/trainer';
import { VirtualMachine } from '../../class/virtual-machine';


@Component({

  templateUrl: './create-training-session.component.html',

})
export class CreateTrainingSessionComponent implements OnInit {


  trainingSession: TrainingSession = new TrainingSession();
  trainingCordinators: any;
  trainingLocations: any;
  trainingRooms: any;
  virtualMachineIds: number[] = [];
  trainerIds: number[] = [];
  trainerId: number = 0;
  trainers: Trainer[];
  virtualMachines: VirtualMachine[];

  virtualMachinesFilterd: VirtualMachine[];


  virtualMachineId: number = 0;

  constructor(private trainingSessionService: TrainingSessionService, private router: Router, private generalService: GeneralService, private virtualMachineService: VirtualMachineService, private trainerService: TrainerService) { }

  ngOnInit(): void {



    this.generalService.getAlltrainerCordinators().subscribe(data => {
      this.trainingCordinators = data;
    });

    this.generalService.getAlllocations().subscribe(data => {
      this.trainingLocations = data;
    });

    this.generalService.trainingRooms().subscribe(data => {
      this.trainingRooms = data;
    });

  }

  saveTrainingSession() {
    this.trainingSessionService.createTrainingSession(this.trainingSession).subscribe(data => {
      console.log(data);

    },
      error => console.error(error));
  }


  onSubmit() {

    this.saveTrainingSession();
  }

  addVm() {

    if (this.trainingSession.ifsApplicationVersion != null) {
      console.log("IFS Version is ......" + this.trainingSession.ifsApplicationVersion)
    } else {
      alert("Please enter the ifsApplicationVersion before checking for the VMs");
    }


    this.virtualMachineService.getVirtualMachinebyId(this.virtualMachineId).subscribe(data => {
      this.virtualMachineIds.push(this.virtualMachineId);
      console.log(data);
      console.log("virtual machines Ids" + this.virtualMachineIds);
    },
      error => console.error(error));

  }

  getAvailableVM() {

    console.log(this.trainingSession.startDate)

    this.virtualMachineService.getAvailableVirtualMachineList(this.trainingSession.startDate, this.trainingSession.ifsApplicationVersion, this.trainingSession.duration).subscribe(data => {
      console.log(data);
      this.virtualMachines = data;
    },
      error => console.error(error));

  }

  getAvailableTrainers() {

    console.log('getting available Trainers')

    let type = this.trainingSession.type;

    this.trainerService.getAvailableTrainerList(type, this.trainingSession.startDate, this.trainingSession.duration).subscribe(data => {
      this.trainers = data;

      console.log(this.trainers);
    },
      error => console.error(error));

  }

  addTrainer(){

    this.trainerIds.push(this.trainerId);   
      console.log("Trainer Id pushed" + this.trainerId);
      console.log("Trainer Ids"  + this.trainerIds);

  }

}
