import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Train } from '../../shared/models';
import { TrainDataService } from './services/train-data.service';
import { TrainCardComponent } from './components/train-card/train-card';

@Component({
  selector: 'app-trains',
  imports: [FormsModule, NgbAlert, TrainCardComponent],
  templateUrl: './trains.html'
})
export class TrainsComponent implements OnInit {
  private readonly dataService = inject(TrainDataService);

  protected allTrains: Train[] = [];
  protected fromFilter = '';
  protected toFilter = '';
  protected dateFilter = '';
  protected timeAfter = '00:00';
  protected timeBefore = '23:59';
  protected loading = true;

  get availableFroms(): string[] {
    return [...new Set(this.allTrains.map(t => t.from))].sort();
  }

  get availableTos(): string[] {
    return [...new Set(
      this.allTrains.filter(t => !this.fromFilter || t.from === this.fromFilter).map(t => t.to)
    )].sort();
  }

  get filtered(): Train[] {
    return this.allTrains
      .filter(t => !this.fromFilter || t.from === this.fromFilter)
      .filter(t => !this.toFilter || t.to === this.toFilter)
      .filter(t => !this.dateFilter || t.departure.startsWith(this.dateFilter))
      .filter(t => {
        const dep = t.departure.substring(11, 16);
        return dep >= this.timeAfter && dep <= this.timeBefore;
      })
      .sort((a, b) => a.departure.localeCompare(b.departure));
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe(data => {
      this.allTrains = data;
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
