import { Component, OnInit } from '@angular/core';
import { TrainingRoom } from '../../class/training-room';
import { GeneralService } from '../../service/general.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './training-room.component.html',

})
export class TrainingRoomComponent implements OnInit {

  form : any ={};
  private trainingRoom : TrainingRoom;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.form);
    this.trainingRoom = new TrainingRoom(this.form.capacity);
    this.generalService.addTrainingRoom(this.trainingRoom).subscribe(data => {
      console.log("data --");
      console.log(data);
    });
    Swal.fire('Added', 'Training Room Added', 'success');
    
  } 

}
