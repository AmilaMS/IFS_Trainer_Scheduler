import { Component, OnInit } from '@angular/core';
import { Location } from '../../class/location';
import { GeneralService } from '../../service/general.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './location.component.html',

})
export class LocationComponent implements OnInit {

  form : any ={};
  private location:Location;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.form);
    this.location = new Location(this.form.locationName, this.form.region);
    this.generalService.addLocation(this.location).subscribe(data => {
      console.log("data --");
      console.log(data);
    });
    Swal.fire('Added', this.form.locationName +' added ', 'success');
    
  } 
}
