import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../login/sign-up/sign-up.component';
import { SignInComponent } from '../login/sign-in/sign-in.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'signup', component: LoginComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: LoginComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }, {
    path: 'bookingService',
    loadChildren: () => import('./../booking/booking.module').then(m => m.BookingModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
