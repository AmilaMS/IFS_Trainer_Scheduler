import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { AvailabilityComponent } from './availability/availability.component';
import { LeaveFormComponent } from './leave-response-form/leave-form.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Leave Details'
    },
    children: [
      {
        path: '',
        redirectTo: 'leave-request'
      },
      {
        path: 'leave-request',
        component: LeaveRequestComponent,
        data: {
          title: 'Leave Request'
        }
      },
      {
        path: 'trainer-availability',
        component: AvailabilityComponent,
        data: {
          title: 'Trainer Availability'
        }
      },
      {
        path: 'leave-form',
        component: LeaveFormComponent,
        data: {
          title: 'Trainer Leave Form'
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveDetailsRoutingModule { }
