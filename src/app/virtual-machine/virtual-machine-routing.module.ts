import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVirtualMachineComponent } from './add-virtual-machine/add-virtual-machine.component';
import { VirtualMachineListComponent } from './virtual-machine-list/virtual-machine-list.component';
import { VirtualMachineDetailsComponent } from './virtual-machine-details/virtual-machine-details.component';
import { UpdateVirtualMachineComponent } from './update-virtual-machine/update-virtual-machine.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Virtual Machine'
    },
    children: [
      {
        path: '',
        redirectTo: 'virtual-machine-list'
      },
      {
        path: 'add-virtual-machine',
        component: AddVirtualMachineComponent,
        data: {
          title: 'Add Virtual Machine'
        }
      },
      {
        path: 'virtual-machine-list',
        component: VirtualMachineListComponent,
        data: {
          title: 'Virtual Machine List'
        }
      },
      {
        path: 'virtual-machine-details',
        component: VirtualMachineDetailsComponent,
        data: {
          title: 'Virtual Machine Details'
        }
      },
      {
        path: 'update-virtual-machine',
        component: UpdateVirtualMachineComponent,
        data: {
          title: 'Update Virtual Machine'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualMachineRoutingModule { }
