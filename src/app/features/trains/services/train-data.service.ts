import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Train } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class TrainDataService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Train[]> {
    return this.http.get<Train[]>('assets/data/trains.json');
  }
}
