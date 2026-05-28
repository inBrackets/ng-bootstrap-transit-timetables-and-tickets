import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Flight } from '../../../../shared/models';
import { transitDuration, transitFormatDate, transitFormatTime, transitSeatColorClass } from '../../../../shared/utils/transit.utils';

@Component({
  selector: 'app-flight-card',
  imports: [NgbTooltip],
  templateUrl: './flight-card.html'
})
export class FlightCardComponent {
  flight = input.required<Flight>();

  protected readonly basket = inject(BasketService);

  protected get inBasket(): boolean {
    return this.basket.isInBasket(this.flight().id);
  }

  protected get duration(): string { return transitDuration(this.flight().departure, this.flight().arrival); }
  protected get seatColorClass(): string { return transitSeatColorClass(this.flight().seats); }
  protected formatTime(iso: string): string { return transitFormatTime(iso); }
  protected formatDate(iso: string): string { return transitFormatDate(iso); }

  protected addToBasket(): void {
    const f = this.flight();
    this.basket.add({
      type: 'flight',
      itemId: f.id,
      from: `${f.from} (${f.fromCode})`,
      to: `${f.to} (${f.toCode})`,
      departure: f.departure,
      arrival: f.arrival,
      price: f.price,
      label: `${f.airline} · ${f.flightNumber}`
    });
  }
}
