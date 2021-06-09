import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { UpdateTrainerDetailsComponent } from './update-trainer-details/update-trainer-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trainers'
    },
    children: [
      {
        path: '',
        redirectTo: 'trainer-list'
      },
      {
        path: 'add-trainer',
        component: AddTrainerComponent,
        data: {
          title: 'Add Trainer'
        }
      },
      {
        path: 'trainer-list',
        component: TrainerListComponent,
        data: {
          title: 'Trainer List'
        }
      },
      {
        path: 'update-trainer',
        component: UpdateTrainerDetailsComponent,
        data: {
          title: 'Update Trainer'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
