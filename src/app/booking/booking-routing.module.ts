import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingScreenComponent } from './booking-screen/booking-screen.component';


const routes: Routes = [{
    path: '',
    component: BookingPageComponent
}, {
    path: 'bookingscreen',
    component: BookingScreenComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule { }
