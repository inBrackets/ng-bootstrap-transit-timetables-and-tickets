import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Bus } from '../../shared/models';
import { BusDataService } from './services/bus-data.service';
import { BusCardComponent } from './components/bus-card/bus-card';

@Component({
  selector: 'app-buses',
  imports: [FormsModule, NgbAlert, BusCardComponent],
  templateUrl: './buses.html'
})
export class BusesComponent implements OnInit {
  private readonly dataService = inject(BusDataService);

  protected allBuses: Bus[] = [];
  protected fromFilter = '';
  protected toFilter = '';
  protected dateFilter = '';
  protected timeAfter = '00:00';
  protected timeBefore = '23:59';
  protected loading = true;

  get availableFroms(): string[] {
    return [...new Set(this.allBuses.map(b => b.from))].sort();
  }

  get availableTos(): string[] {
    return [...new Set(
      this.allBuses.filter(b => !this.fromFilter || b.from === this.fromFilter).map(b => b.to)
    )].sort();
  }

  get filtered(): Bus[] {
    return this.allBuses
      .filter(b => !this.fromFilter || b.from === this.fromFilter)
      .filter(b => !this.toFilter || b.to === this.toFilter)
      .filter(b => !this.dateFilter || b.departure.startsWith(this.dateFilter))
      .filter(b => {
        const dep = b.departure.substring(11, 16);
        return dep >= this.timeAfter && dep <= this.timeBefore;
      })
      .sort((a, b) => a.departure.localeCompare(b.departure));
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe(data => {
      this.allBuses = data;
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
