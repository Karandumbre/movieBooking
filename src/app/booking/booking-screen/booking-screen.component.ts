import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-booking-screen',
  templateUrl: './booking-screen.component.html',
  styleUrls: ['./booking-screen.component.scss']
})
export class BookingScreenComponent implements OnInit {
  private routes: any;
  public currentMovieDetails: any;
  public tickets = 1;
  public seats: any[10][10] = [];
  public purchasedTicket = [];
  public modaltitle: any = 'Booking Details';
  public bookedTickets = [];
  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService, private cookieService: CookieService) { }

  /**
   * on init
   * Life cycle hook, Called once, after the first ngOnChanges().
   */
  ngOnInit() {
    this.genCharArray();
    this.routes = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.bookingService.getMovieDetails().subscribe(res => {
          res.forEach(element => {
            if (element.Title === params.movie) {
              this.currentMovieDetails = element;
            }
          });
          this.checkBookedTickets();
        });
      });

  }

  /**
   * Gens char array
   * Used to generate array of 10 * 10
   */
  private genCharArray() {
    for (let i = 0; i < 9; i++) {
      this.seats[i] = [];
      for (let j = 0; j < 10; j++) {
        this.seats[i][j] = { value: String.fromCharCode(65 + i) + j, isSelected: false, status: 'Available' };
      }
    }
  }

  /**
   * Checks booked tickets
   * Function used to check whether for this particular movie if any ticket is booked
   */
  private checkBookedTickets() {
    const movie = this.cookieService.get('Movie');
    const ticketsDetails = this.cookieService.get('purchasedTickets');
    if (movie === this.currentMovieDetails.Title && JSON.parse(ticketsDetails) !== []) {
      this.bookedTickets = this.bookedTickets.concat(JSON.parse(ticketsDetails));
      this.purchasedTicket = JSON.parse(ticketsDetails);
      this.purchasedTicket.forEach(element => {
        this.seats[element.i][element.j].isSelected = true;
        this.seats[element.i][element.j].status = 'Booked';
      });
    }
  }
  /**
   * Tickets array
   * @param event Checkbox event, is fired when the tickets are clicked
   * @param seatNumber Seatnumber which user selects
   * @param indexI Outer Index value  of the tickets number clicked
   * @param indexJ Inner Index value J of the ticket number clicked
   */
  public ticketArray(event, seatNumber, indexI, indexJ) {
    let indexNumber;
    if (event.target.checked) {
      if (this.tickets >= this.purchasedTicket.length + 1) {
        this.purchasedTicket.push({ seatNumber: seatNumber, i: indexI, j: indexJ });
      } else {
        this.purchasedTicket = [];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 10; j++) {
            if (this.seats[i][j].status === 'Booked') {
              this.seats[i][j] = { value: String.fromCharCode(65 + i) + j, isSelected: true, status: 'Booked' };
            } else {
              this.seats[i][j] = { value: String.fromCharCode(65 + i) + j, isSelected: false, status: 'Available' };
            }
          }
        }
      }
    } else {
      this.purchasedTicket.forEach((element, index) => {
        if (seatNumber === element.seatNumber) {
          indexNumber = index;
        }
      });
      this.purchasedTicket.splice(indexNumber, 1);
    }
    this.purchasedTicket.sort();
  }

  /**
   * Checks length of purchased tickets and selected tickets
   * If selected tickets are less then purchase tickets it returns false
   * @returns a boolean value
   */
  public checkLength() {
    if (this.purchasedTicket.length === Number(this.tickets)) {
      return true;
    }
  }

  /**
   * Function used to book the tickets
   */
  public bookTickets() {
    this.purchasedTicket.forEach(element => {
      this.seats[element.i][element.j].status = 'Booked';
    });
    this.modaltitle = 'Seats Confirmed';
  }

  /**
   * Function used to store booking details in Cookie
   */
  public closeModal() {
    this.bookedTickets = this.bookedTickets.concat(this.purchasedTicket);
    this.modaltitle = 'Booking Details';
    this.cookieService.set('Movie', this.currentMovieDetails.Title);
    this.cookieService.set('purchasedTickets', JSON.stringify(this.bookedTickets));
    this.purchasedTicket = [];
  }
}
