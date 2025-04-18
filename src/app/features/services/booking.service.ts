import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateBookingDto } from '../interfaces/booking-create-DTO/create-booking-dto';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'https://localhost:7015/api/Booking';

  // State for selected dates
  private selectedDatesSubject = new BehaviorSubject<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null
  });
  selectedDates$ = this.selectedDatesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Update selected dates
  updateSelectedDates(dates: { checkIn: Date | null; checkOut: Date | null }): void {
    this.selectedDatesSubject.next(dates);
  }

  // Get the current selected dates
  getSelectedDates(): { checkIn: Date | null; checkOut: Date | null } {
    return this.selectedDatesSubject.getValue();
  }

  createBooking(bookingData: CreateBookingDto): Observable<any> {
    return this.http.post(this.apiUrl, bookingData).pipe(
      catchError(this.handleError<any>('createBooking'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getBookingsAsGuest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/AsGuest`)
      .pipe(catchError(this.handleError<any[]>('getBookingsAsGuest', [])));
  }


  getBookingsAsHost(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/AsHost`)
      .pipe(catchError(this.handleError<any[]>('getBookingsAsHost', [])));
  }

 
  
}
