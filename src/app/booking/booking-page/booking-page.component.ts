import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-screen',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  providers: [BookingService]
})
export class BookingPageComponent implements OnInit {
  public movies: any;
  public currentMovieDetails: any;
  public showMovieCard: boolean;
  movieForm: any;
  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loadMovieDetails();
    this.movieForm = this.formBuilder.group({
      'selectedMovie': new FormControl('')
    });
  }

  /**
   * Changes movie details
   * Used to fetch the details of the movie selected
   */
  ChangeMovieDetails() {
    this.currentMovieDetails = this.movies.find((item) => item.Title === this.movieForm.value.selectedMovie);
    this.showMovieCard = true;
  }

  /**
   * Loads movie details
   */
  loadMovieDetails() {
    this.bookingService.getMovieDetails().subscribe(res => {
      this.movies = res;
    });
  }

}
