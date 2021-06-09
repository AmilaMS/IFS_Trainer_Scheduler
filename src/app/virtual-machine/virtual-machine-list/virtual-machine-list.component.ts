import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';
import { SortRequestVirtualMachines } from '../../class/sort-request-virtual-machines';
import { VirtualMachineService } from '../../service/virtual-machine.service';
import Swal from 'sweetalert2';

interface Info {
  token: string;
  username: string;
  authorities: string[];
}


@Component({

  templateUrl: './virtual-machine-list.component.html',

})
export class VirtualMachineListComponent implements OnInit {

  info: Info;

  filterForm: FormGroup;
  product?: String;
  version?: String;
  region?: String;

  requestBody: SortRequestVirtualMachines;
  virtualMachines: any;
  sortedVirtualMachines: SortRequestVirtualMachines = new SortRequestVirtualMachines();

  authority: string;


  constructor(
    private virtualMachineService: VirtualMachineService,
    private router: Router,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    const token = this.token.getToken();
    const username = this.token.getUsername();
    const authorities = this.token.getAuthorities();
    this.info = {
      token: token,
      username: username,
      authorities: authorities
    };

    this.getVirtualMachines();

  }

  private getVirtualMachines() {

    this.info.authorities.every(role => {
      if (role['authority'] === 'ROLE_MANAGER') {
        this.authority = 'manager';
      }
    });


    this.virtualMachineService.getVirtualMachineList().subscribe(data => {
      this.virtualMachines = data;
    })
  }


  getVirtualMachineDetails(id: number) {
    if (this.authority == 'manager')
      this.router.navigate(['manager/virtual-machine-details', id]);
    else
      this.router.navigate(['trainer/virtual-machine-details', id]);
  }


  updateVirtualMachine(id: number) {
    this.router.navigate(['manager/update-virtual-machine', id]);
  }

  deleteVirtualMachine(id: number) {
    Swal.fire({
      title: 'Delete a training session ?',
      text: 'No recovery is available',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        console.log('Clicked Yes, Session Deleted deleted!');
        this.virtualMachineService.deleteVirtualMachine(id).subscribe(data => {
          console.log(data);
          this.getVirtualMachines();
        })

      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
        this.getVirtualMachines();
      }
    });
  }


  onSubmit() {
    this.requestBody = {
      product: this.product,
      version: this.version,
      region: this.region
    };

    console.log(this.requestBody);
    this.virtualMachineService.getSortedVirtualMachines(this.requestBody).subscribe(data => {
      this.virtualMachines = [];
      this.virtualMachines = data;
    })

  }

}
