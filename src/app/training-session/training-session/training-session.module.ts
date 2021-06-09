import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingSessionRoutingModule } from './training-session-routing.module'; 

import { CreateTrainingSessionComponent } from '../create-training-session/create-training-session.component';
import { TrainingSessionListComponent } from '../training-session-list/training-session-list.component';
import { TrainingSessionDetailsComponent } from '../training-session-details/training-session-details.component';
import { UpdateTrainingSessionComponent } from '../update-training-session/update-training-session.component';



@NgModule({
  declarations: [
    CreateTrainingSessionComponent,
    TrainingSessionListComponent,
    TrainingSessionDetailsComponent,
    UpdateTrainingSessionComponent
  ],
  imports: [
    CommonModule,
    TrainingSessionRoutingModule
  ]
})
export class TrainingSessionModule { }
