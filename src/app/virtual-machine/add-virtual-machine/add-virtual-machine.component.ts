import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualMachine } from '../../class/virtual-machine';
import { VirtualMachineService } from '../../service/virtual-machine.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './add-virtual-machine.component.html'
})

export class AddVirtualMachineComponent implements OnInit {

  virtualMachine: VirtualMachine = new VirtualMachine();
  tempProduct: String;
  status1: String = "working";
  status2: String = "repairing";

  constructor(private virtualMachineService: VirtualMachineService, private router: Router) { }


  ngOnInit(): void {
  }

  saveVirtualMachine() {
    

    this.virtualMachineService.addVirtualMachine(this.virtualMachine).subscribe(data => {
      console.log(data);
      Swal.fire({
        title: 'Added',
        text: 'Virtual Machine Successfully Added!',
        icon: 'success'
      });
      this.goToVirtualMachineList();
    }, error => console.log(error));
  }

  goToVirtualMachineList(){
    this.router.navigate(['/manager/virtual-machine-list']);
  }


  onSubmit() {
    console.log("submitting.......")
    console.log(this.virtualMachine);
    this.saveVirtualMachine();
  }


}
