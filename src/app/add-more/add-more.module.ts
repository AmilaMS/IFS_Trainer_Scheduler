import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMoreRoutingModule } from './add-more-routing.module';
import { CoordinaatorComponent } from './coordinaator/coordinaator.component';
import { LocationComponent } from './location/location.component';
import { TrainingRoomComponent } from './training-room/training-room.component'



@NgModule({
  declarations: [
    CoordinaatorComponent,
    LocationComponent,
    TrainingRoomComponent
  ],
  imports: [
    CommonModule,
    AddMoreRoutingModule
  ]
})
export class AddMoreModule { }
