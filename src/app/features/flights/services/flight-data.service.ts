import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class FlightDataService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>('assets/data/flights.json');
  }
}
