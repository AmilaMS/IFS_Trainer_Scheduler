import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveDetailsRoutingModule } from './leave-details-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { AvailabilityComponent } from './availability/availability.component';
import { LeaveFormComponent } from './leave-response-form/leave-form.component';
import { LeaveApplyFormComponent } from './leave-apply-form/leave-apply-form.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { UpdateLeaveApplyFormComponent } from './update-leave-apply-form/update-leave-apply-form.component'


@NgModule({
  declarations: [
    
  
    LeaveRequestComponent,
    AvailabilityComponent,
    LeaveFormComponent,
    LeaveApplyFormComponent,
    LeaveListComponent,
    UpdateLeaveApplyFormComponent
  ],
  imports: [
    CommonModule,
    LeaveDetailsRoutingModule
  ]
})
export class LeaveDetailsModule { }
