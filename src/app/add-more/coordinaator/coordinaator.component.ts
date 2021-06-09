import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingCordinator } from '../../class/training-cordinator';
import { GeneralService } from '../../service/general.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './coordinaator.component.html',

})
export class CoordinaatorComponent implements OnInit {

  form : any ={};
 
  private trainingCordinator: TrainingCordinator;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.form);
    this.trainingCordinator = new TrainingCordinator(this.form.name);
    this.generalService.addtrainerCordinators(this.trainingCordinator).subscribe(data => {
      console.log("data --");
      console.log(data);
    });
    Swal.fire('Added', this.form.name +' added ', 'success');
    
  }
}
