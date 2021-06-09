import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './default-layout.component';
import { CreateTrainingSessionComponent } from '../../training-session/create-training-session/create-training-session.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { TrainingSessionListComponent } from '../../training-session/training-session-list/training-session-list.component';
import { UpdateTrainingSessionComponent } from '../../training-session/update-training-session/update-training-session.component';
import { TrainingSessionDetailsComponent } from '../../training-session/training-session-details/training-session-details.component';
import { AddTrainerComponent } from '../../trainer/add-trainer/add-trainer.component';
import { UpdateTrainerDetailsComponent } from '../../trainer/update-trainer-details/update-trainer-details.component';
import { TrainerListComponent } from '../../trainer/trainer-list/trainer-list.component';
import { AddVirtualMachineComponent } from '../../virtual-machine/add-virtual-machine/add-virtual-machine.component';
import { VirtualMachineListComponent } from '../../virtual-machine/virtual-machine-list/virtual-machine-list.component';
import { VirtualMachineDetailsComponent } from '../../virtual-machine/virtual-machine-details/virtual-machine-details.component';
import { UpdateVirtualMachineComponent } from '../../virtual-machine/update-virtual-machine/update-virtual-machine.component';
import { AvailabilityComponent } from '../../leave-details/availability/availability.component';
import { LeaveRequestComponent } from '../../leave-details/leave-request/leave-request.component';
import { LeaveFormComponent } from '../../leave-details/leave-response-form/leave-form.component';
import { CoordinaatorComponent } from '../../add-more/coordinaator/coordinaator.component';
import { LocationComponent } from '../../add-more/location/location.component';
import { TrainingRoomComponent } from '../../add-more/training-room/training-room.component';





const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Manager Home'
    },
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent
      },
      {
        path: 'create-training-session',
        component:CreateTrainingSessionComponent
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
        path: 'add-trainer',
        component:AddTrainerComponent
      },
      {
        path: 'trainer-list',
        component:TrainerListComponent
      },
      {
        path: 'update-trainer',
        component:UpdateTrainerDetailsComponent
      },
      {
        path: 'add-virtual-machine',
        component:AddVirtualMachineComponent
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
        path:'trainer-availability',
        component:AvailabilityComponent

      },
      {
        path:'leave-request',
        component:LeaveRequestComponent

      },
      {
        path:'leave-response-form/:id',
        component:LeaveFormComponent

      },
      {
        path: 'add-coordinator',
        component :CoordinaatorComponent
      },
      {
        path: 'add-training-room',
        component :TrainingRoomComponent
      },
      {
        path: 'add-location',
        component :LocationComponent
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
export class DefaultLayoutRoutingModule { }
