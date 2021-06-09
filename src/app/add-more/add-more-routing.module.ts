import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinaatorComponent } from './coordinaator/coordinaator.component';
import { LocationComponent } from './location/location.component';
import { TrainingRoomComponent } from './training-room/training-room.component'


const routes:Routes=[
  {
    path: '',
    data: {
      title: 'Add More'
    },
    children: [
      {
        path: '',
        redirectTo: 'add-coordinator'
      },
      {
        path: 'add-coordinator',
        component: CoordinaatorComponent,
        data: {
          title: 'Add Coordinator'
        }
      },
      {
        path: 'add-location',
        component: LocationComponent,
        data: {
          title: 'Add Location'
        }
      },
      {
        path: 'add-training-room',
        component: TrainingRoomComponent,
        data: {
          title: 'Add Training Room'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMoreRoutingModule { }
