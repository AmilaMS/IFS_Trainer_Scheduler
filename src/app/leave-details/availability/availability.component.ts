import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../../interface/task';
import { LeaveService } from '../../service/leave.service';
import { LeaveInfo } from '../../auth/leave-info';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {

  CalendarEventAction,
  CalendarEventTimesChangedEvent,

} from 'angular-calendar';

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

  templateUrl: './availability.component.html',

})
export class AvailabilityComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  leaves: LeaveInfo[];
  view: CalendarView = CalendarView.Month;
  allTrainingSessions: LeaveInfo[];
  CalendarView = CalendarView;
  tasks: Observable<Array<ITask>>;
  viewDate: Date = new Date();
  pageOfItems: Array<any>;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  searchValue: string;
  p: number = 1;
  bgHome;
  constructor(private modal: NgbModal, private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getTaskCounts();
  }

  getTasks() {
    this.leaveService.getLeaves().subscribe(data => {
      console.log(data);
      this.leaves = data;
    });
  }

  getTaskCounts() {
    this.leaveService.getLeaveCount().subscribe(data => {
      console.log(data);
      this.bgHome = data;
    });
  }

  addEvent(leaves: LeaveInfo): void {

    //add a for loop and add the duration function as well.
    console.log(leaves.trainer.trainerId);

    this.events = [

      ...this.events,
      {
    
        title: ' &nbsp  Trainer ID: ' + leaves.trainer.trainerId + '  &nbsp   &nbsp   &nbsp   &nbsp   Trainer Name: ' + leaves.trainer.name,
        start: startOfDay(new Date(leaves.date)),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

  }

  loadLeavesonCalender() {
    for (let i = 0; i < this.leaves.length; i++) {
      console.log('adding Training Session');
      this.addEvent(this.leaves[i]);

    }
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Today',
    },
  ]

  refresh: Subject<any> = new Subject();

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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}