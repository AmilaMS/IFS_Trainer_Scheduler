import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { UpdateTrainerDetailsComponent } from './update-trainer-details/update-trainer-details.component';



@NgModule({
  declarations: [
    AddTrainerComponent,
    TrainerListComponent,
    UpdateTrainerDetailsComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ]
})
export class TrainerModule { }
