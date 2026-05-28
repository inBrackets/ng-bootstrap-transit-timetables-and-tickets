import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Flight } from '../../shared/models';
import { FlightDataService } from './services/flight-data.service';
import { FlightCardComponent } from './components/flight-card/flight-card';

@Component({
  selector: 'app-flights',
  imports: [FormsModule, NgbAlert, FlightCardComponent],
  templateUrl: './flights.html'
})
export class FlightsComponent implements OnInit {
  private readonly dataService = inject(FlightDataService);

  protected allFlights: Flight[] = [];
  protected fromFilter = '';
  protected toFilter = '';
  protected dateFilter = '';
  protected timeAfter = '00:00';
  protected timeBefore = '23:59';
  protected loading = true;

  get availableFroms(): string[] {
    return [...new Set(this.allFlights.map(f => f.from))].sort();
  }

  get availableTos(): string[] {
    return [...new Set(
      this.allFlights.filter(f => !this.fromFilter || f.from === this.fromFilter).map(f => f.to)
    )].sort();
  }

  get filtered(): Flight[] {
    return this.allFlights
      .filter(f => !this.fromFilter || f.from === this.fromFilter)
      .filter(f => !this.toFilter || f.to === this.toFilter)
      .filter(f => !this.dateFilter || f.departure.startsWith(this.dateFilter))
      .filter(f => {
        const dep = f.departure.substring(11, 16);
        return dep >= this.timeAfter && dep <= this.timeBefore;
      })
      .sort((a, b) => a.departure.localeCompare(b.departure));
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe(data => {
      this.allFlights = data;
      this.loading = false;
    });
  }

  protected onFromChange(value: string): void {
    this.fromFilter = value;
    if (this.toFilter && !this.availableTos.includes(this.toFilter)) {
      this.toFilter = '';
    }
  }

  protected clearFilters(): void {
    this.fromFilter = '';
    this.toFilter = '';
    this.dateFilter = '';
    this.timeAfter = '00:00';
    this.timeBefore = '23:59';
  }
}
