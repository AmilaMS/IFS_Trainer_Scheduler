import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TrainingSession } from '../../class/training-session';
import { Event } from '../../class/event';
import { VirtualMachine } from '../../class/virtual-machine';
import { TrainingSessionService } from '../../service/training-session.service';
import { VirtualMachineService } from '../../service/virtual-machine.service';


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


import {

  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  templateUrl: './virtual-machine-details.component.html',
})
export class VirtualMachineDetailsComponent implements OnInit {


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  calEvent: CalendarEvent;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  private modal: NgbModal;
  refresh: Subject<any> = new Subject();
  id: number;
  virtualMachine: VirtualMachine = new VirtualMachine();
  trainingSessions: TrainingSession[];

  constructor(private route: ActivatedRoute, private trainingSessionService: TrainingSessionService, private virtualMachineService: VirtualMachineService, private router: Router) {
    this.events = new Array();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.virtualMachine = new VirtualMachine();
    this.virtualMachineService.getVirtualMachinebyId(this.id).subscribe(data => {
      this.virtualMachine = data;
      console.log(this.virtualMachine.trainingSessions);
      this.trainingSessions = this.virtualMachine.trainingSessions;

    });

    console.log(this.events);

  }

  activeDayIsOpen: boolean = true;

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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
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
    this.events = [
      ...this.events,
      {
        title: temptrainingSession.sessionName,
        start: startOfDay(new Date(temptrainingSession.startDate)),
      },
    ];
  }


  showEvents() {
    for (let i = 0; i < this.trainingSessions.length; i++) {
      console.log('adding Training Session');
      this.addEvent(this.trainingSessions[i]);
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
}
