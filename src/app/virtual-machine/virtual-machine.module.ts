import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualMachineRoutingModule } from './virtual-machine-routing.module';
import { AddVirtualMachineComponent } from './add-virtual-machine/add-virtual-machine.component';
import { VirtualMachineListComponent } from './virtual-machine-list/virtual-machine-list.component';
import { VirtualMachineDetailsComponent } from './virtual-machine-details/virtual-machine-details.component';
import { UpdateVirtualMachineComponent } from './update-virtual-machine/update-virtual-machine.component';



@NgModule({
  declarations: [
    AddVirtualMachineComponent,
    VirtualMachineListComponent,
    VirtualMachineDetailsComponent,
    UpdateVirtualMachineComponent
  ],
  imports: [
    CommonModule,
    VirtualMachineRoutingModule
  ]
})
export class VirtualMachineModule { }
