import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public detail: boolean;
  constructor(private _http: HttpClient) { }

  /**
   * Returns a list of movie details present in Film.json file
   * @returns movie details
   */
  public getMovieDetails(): Observable<any> {
    return this._http.get<any>('../../assets/Film.json');
  }
}
