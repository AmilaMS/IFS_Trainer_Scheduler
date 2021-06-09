import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTrainingSessionComponent } from '../create-training-session/create-training-session.component';
import { TrainingSessionListComponent } from '../training-session-list/training-session-list.component';
import { TrainingSessionDetailsComponent } from '../training-session-details/training-session-details.component';
import { UpdateTrainingSessionComponent } from '../update-training-session/update-training-session.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Training Sessions'
    },
    children: [
      {
        path: '',
        redirectTo: 'training-session-list'
      },
      {
        path: 'create-training-session',
        component: CreateTrainingSessionComponent,
        data: {
          title: 'Create Training Session'
        }
      },
      {
        path: 'training-session-list',
        component: TrainingSessionListComponent,
        data: {
          title: 'Training Session List'
        }
      },
      {
        path: 'training-session-details',
        component: TrainingSessionDetailsComponent,
        data: {
          title: 'Training Session Details'
        }
      },
      {
        path: 'update-training-session',
        component: UpdateTrainingSessionComponent,
        data: {
          title: 'Update Training Session'
        }
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingSessionRoutingModule { }
