import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingSession } from '../../class/training-session';
import { TrainingSessionService } from '../../service/training-session.service';
import { GeneralService } from '../../service/general.service';
import { VirtualMachineService } from '../../service/virtual-machine.service';

import { TrainerService } from '../../service/trainer.service';
import { Trainer } from '../../class/trainer';
import { VirtualMachine } from '../../class/virtual-machine';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../../class/location';
import { TrainingCordinator } from '../../class/training-cordinator';
import { TrainingRoom } from '../../class/training-room';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns/esm';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';



@Component({

  templateUrl: './create-training-session.component.html',

})
export class CreateTrainingSessionComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  trainingSession: TrainingSession = new TrainingSession();
  virtualMachineIds: number[] = [];
  trainerIds: number[] = [];
  trainerId: number = 0;
  trainers: Trainer[];
  virtualMachines: VirtualMachine[];
  availablelocations: Location[];
  availabletrainingCordinators: TrainingCordinator[];
  availabletrainingRooms: TrainingRoom[];

  availableTrainers: Trainer[];
  availableVirtualMachines: VirtualMachine[];

  tempTrainer: Trainer;
  tempVirtualMachine: VirtualMachine;


  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  date: Date;
  // for calender view All Training Sessions
  allTrainingSessions: TrainingSession[];


  calEvent: CalendarEvent;
  refresh: Subject<any> = new Subject();

  //to check the filtering function
  virtualMachinesFilterd: VirtualMachine[];


  virtualMachineId: number = 0;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  private modal: NgbModal
  constructor(private generalService: GeneralService, private trainingSessionService: TrainingSessionService, private router: Router, private virtualMachineService: VirtualMachineService, private trainerService: TrainerService) { }



  ngOnInit(): void {

    this.trainingSession.trainers = [];
    this.trainingSession.virtualMachines = [];


    this.trainingSessionService.getTrainingSessionList().subscribe(data => {
      this.allTrainingSessions = data;
      console.log(data);
    },
      error => console.error(error));

    this.generalService.getAlltrainerCordinators().subscribe(data => {
      this.availabletrainingCordinators = data;
    });

    this.generalService.getAlllocations().subscribe(data => {
      this.availablelocations = data;
    });

    this.generalService.trainingRooms().subscribe(data => {
      this.availabletrainingRooms = data;
    });

  }
  saveTrainingSession() {
    this.trainingSessionService.createTrainingSession(this.trainingSession).subscribe(data => {
      console.log(data);
      this.goToTrainingSessionList();
    },
      error => console.error(error));
  }

  goToTrainingSessionList() {
    this.router.navigate(['manager/training-session-list']);
  }


  onSubmit() {


    this.trainingSession.vmIds = this.virtualMachineIds;
    this.trainingSession.trainerids = this.trainerIds;
    console.log(this.trainingSession);
    this.saveTrainingSession();
    this.goToTrainingSessionList()
  }



  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Training event',
    },
    {
      start: startOfDay(new Date()),
      title: 'Meeting',
    },

  ]

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log('Day is clicked')

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }



  addEvent(temptrainingSession: TrainingSession): void {

    //add a for loop and add the duration function as well.


    this.events = [
      ...this.events,
      {
        title: temptrainingSession.sessionName + ' Duration ' + temptrainingSession.duration,
        start: startOfDay(new Date(temptrainingSession.startDate)),
      },
    ];

  }


  loadTrainingSession() {


    for (let i = 0; i < this.allTrainingSessions.length; i++) {
      console.log('adding Training Session');
      this.addEvent(this.allTrainingSessions[i]);

    }

  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }




  addVm() {

    console.log('Virtual that was added is ' + this.virtualMachineId);

    this.virtualMachineService.getVirtualMachinebyId(this.virtualMachineId).subscribe(data => {

      this.trainingSession.virtualMachines.push(data);
    },
      error => console.error(error));

    console.log('Training Session Virtual Machines are ' + this.trainingSession.virtualMachines);

  }

  getAvailableVM() {


    this.virtualMachineService.getAvailableVirtualMachineList(this.trainingSession.startDate, this.trainingSession.ifsApplicationVersion, this.trainingSession.duration).subscribe(data => {
      console.log(data);
      this.availableVirtualMachines = data;
    },
      error => console.error(error));

  }


  getAvailableTrainers() {

    console.log('getting available Trainers')

    let type = this.trainingSession.type;

    this.trainerService.getAvailableTrainerList(type, this.trainingSession.startDate, this.trainingSession.duration).subscribe(data => {
      this.availableTrainers = data;

      console.log(this.availableTrainers);
    },
      error => console.error(error));

  }





  addTrainer() {

    console.log('Trainer that was added is ' + this.trainerId);




    this.trainerService.getTrainerbyId(this.trainerId).subscribe(data => {

      this.trainingSession.trainers.push(data)
    },
      error => console.error(error));


    console.log('Training Session Trainers are ' + this.trainingSession.trainers)

  }


  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  removeVirtualMachineID(tempVm: VirtualMachine) {

    const index: number = this.trainingSession.virtualMachines.indexOf(tempVm);
    if (index !== -1) {
      this.trainingSession.virtualMachines.splice(index, 1);
    }


  }


  removeTrainer(tempTrainer: Trainer) {

    const index: number = this.trainingSession.trainers.indexOf(tempTrainer);
    if (index !== -1) {
      this.trainingSession.trainers.splice(index, 1);
    }

  }






}
