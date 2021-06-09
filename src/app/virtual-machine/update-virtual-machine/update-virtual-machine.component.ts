import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualMachine } from '../../class/virtual-machine';
import { VirtualMachineService } from '../../service/virtual-machine.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './update-virtual-machine.component.html',

})
export class UpdateVirtualMachineComponent implements OnInit {

  id: number;
  virtualMachine: VirtualMachine = new VirtualMachine();
  status1: String = "working";
  status2: String = "repairing";


  constructor(
    private virtualMachineService: VirtualMachineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.virtualMachineService.getVirtualMachinebyId(this.id).subscribe(data => {
      this.virtualMachine = data;
    }, error => console.log(error));

  }

  onSubmit() {
    this.virtualMachineService.updateVirtualMachine(this.id, this.virtualMachine).subscribe(data => {
      console.log(this.virtualMachine);
      Swal.fire({
        title: 'Updated',
        text: 'Virtual Machine Successfully Updated!',
        icon: 'success'
      });
      this.goToVirtualMachineList();
    }, error => console.log(error));
  }

  goToVirtualMachineList() {
    this.router.navigate(['/manager/virtual-machine-list']);
  }


}
