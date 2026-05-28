import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class BusDataService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Bus[]> {
    return this.http.get<Bus[]>('assets/data/buses.json');
  }
}
