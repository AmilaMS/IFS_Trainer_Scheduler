import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainerLayoutComponent } from './trainer-layout.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { TrainingSessionListComponent } from '../../training-session/training-session-list/training-session-list.component';
import { UpdateTrainingSessionComponent } from '../../training-session/update-training-session/update-training-session.component';
import { TrainingSessionDetailsComponent } from '../../training-session/training-session-details/training-session-details.component';
import { VirtualMachineListComponent } from '../../virtual-machine/virtual-machine-list/virtual-machine-list.component';
import { VirtualMachineDetailsComponent } from '../../virtual-machine/virtual-machine-details/virtual-machine-details.component';
import { UpdateVirtualMachineComponent } from '../../virtual-machine/update-virtual-machine/update-virtual-machine.component';
import { LeaveApplyFormComponent } from '../../leave-details/leave-apply-form/leave-apply-form.component';
import { LeaveListComponent } from '../../leave-details/leave-list/leave-list.component';
import { UpdateLeaveApplyFormComponent } from '../../leave-details/update-leave-apply-form/update-leave-apply-form.component';

const routes: Routes = [
  {
    path: '',
    component: TrainerLayoutComponent,
    data: {
      title: 'Trainer Home'
    },
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent
      },
      {
        path: 'training-session-list',
        component:TrainingSessionListComponent
      },
      {
        path: 'update-training-session/:id',
        component:UpdateTrainingSessionComponent
      },
      {
        path: 'training-session-details/:id',
        component:TrainingSessionDetailsComponent
      },
      {
        path: 'virtual-machine-list',
        component:VirtualMachineListComponent
      },
      {
        path: 'update-virtual-machine/:id',
        component:UpdateVirtualMachineComponent
      },
      {
        path: 'virtual-machine-details/:id',
        component:VirtualMachineDetailsComponent
      },
      {
        path: 'leave-apply',
        component:LeaveApplyFormComponent
      },
      {
        path: 'leave-list',
        component:LeaveListComponent
      },
      {
        path: 'update-leave-apply-form/:id',
        component:UpdateLeaveApplyFormComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerLayoutRoutingModule { }
