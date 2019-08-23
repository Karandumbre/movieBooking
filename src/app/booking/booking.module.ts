import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingScreenComponent } from './booking-screen/booking-screen.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [BookingPageComponent, BookingScreenComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BookingRoutingModule
  ], providers: [CookieService]
})
export class BookingModule { }
