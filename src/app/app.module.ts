import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { AuthInterceptor } from './auth/auth-interceptor';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthGuardService } from './service/auth.guard.service';
import { NgxPaginationModule } from 'ngx-pagination';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { TrainerLayoutComponent } from './containers/trainer-layout/trainer-layout.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  TrainerLayoutComponent

];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { CreateTrainingSessionComponent } from './training-session/create-training-session/create-training-session.component';
import { TrainingSessionListComponent } from './training-session/training-session-list/training-session-list.component';
import { TrainingSessionDetailsComponent } from './training-session/training-session-details/training-session-details.component';
import { UpdateTrainingSessionComponent } from './training-session/update-training-session/update-training-session.component';
import { CoordinaatorComponent } from './add-more/coordinaator/coordinaator.component';
import { LocationComponent } from './add-more/location/location.component';
import { TrainingRoomComponent } from './add-more/training-room/training-room.component';
import { TrainerListComponent } from './trainer/trainer-list/trainer-list.component';
import { AddTrainerComponent } from './trainer/add-trainer/add-trainer.component';
import { UpdateTrainerDetailsComponent } from './trainer/update-trainer-details/update-trainer-details.component';
import { AddVirtualMachineComponent } from './virtual-machine/add-virtual-machine/add-virtual-machine.component';
import { UpdateVirtualMachineComponent } from './virtual-machine/update-virtual-machine/update-virtual-machine.component';
import { VirtualMachineDetailsComponent } from './virtual-machine/virtual-machine-details/virtual-machine-details.component';
import { VirtualMachineListComponent } from './virtual-machine/virtual-machine-list/virtual-machine-list.component';
import { P403Component } from './views/error/p403.component';
import { LeaveListComponent } from './leave-details/leave-list/leave-list.component';
import { AvailabilityComponent } from './leave-details/availability/availability.component';
import { LeaveApplyFormComponent } from './leave-details/leave-apply-form/leave-apply-form.component';
import { LeaveRequestComponent } from './leave-details/leave-request/leave-request.component';
import { LeaveFormComponent } from './leave-details/leave-response-form/leave-form.component';
import { UpdateLeaveApplyFormComponent } from './leave-details/update-leave-apply-form/update-leave-apply-form.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { JwPaginationComponent } from 'jw-angular-pagination';








@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    NgxPaginationModule,
    IconModule,
    IconSetModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    P403Component,
    LoginComponent,
    RegisterComponent,
    CreateTrainingSessionComponent,
    TrainingSessionListComponent,
    TrainingSessionDetailsComponent,
    UpdateTrainingSessionComponent,
    CoordinaatorComponent,
    LocationComponent,
    TrainingRoomComponent,
    TrainerListComponent,
    AddTrainerComponent,
    UpdateTrainerDetailsComponent,
    AddVirtualMachineComponent,
    UpdateVirtualMachineComponent,
    VirtualMachineDetailsComponent,
    VirtualMachineListComponent,
    P403Component,
    LeaveListComponent,
    LeaveApplyFormComponent,
    UpdateLeaveApplyFormComponent,
    LeaveRequestComponent,
    AvailabilityComponent,
    LeaveFormComponent,
    SearchfilterPipe,
    JwPaginationComponent

    
  
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuardService,
    IconSetService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    }

  ],
  exports: [RouterModule, ChartsModule, AppRoutingModule, ReactiveFormsModule],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
