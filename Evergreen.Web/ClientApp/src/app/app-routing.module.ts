import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthCallbackComponent} from './shared/auth/auth-callback.component';

const routes: Routes = [
  {path: 'auth', component: AuthCallbackComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
