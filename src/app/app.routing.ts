import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { P404Component } from './views/error/404.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth.guard.service';
import { P403Component } from './views/error/p403.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '403',
    component: P403Component,
    data: {
      title: 'Page 403'
    }
  },
  
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: 'manager',canActivate:[AuthGuardService],
    loadChildren: ()=> import('./containers/default-layout/default-layout.module').then(m => m.DefaultLayoutModule)
  },
  {
    path: 'trainer',
    loadChildren: ()=> import('./containers/trainer-layout/trainer-layout.module').then(m => m.TrainerLayoutModule)
  },

  
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
