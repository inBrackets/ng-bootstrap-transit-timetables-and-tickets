import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Flight } from '../../../../shared/models';

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

  protected get duration(): string {
    const mins = (new Date(this.flight().arrival).getTime() - new Date(this.flight().departure).getTime()) / 60000;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  protected formatTime(iso: string): string {
    return iso.substring(11, 16);
  }

  protected formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

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
