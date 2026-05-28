import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Bus } from '../../../../shared/models';

@Component({
  selector: 'app-bus-card',
  imports: [NgbTooltip],
  templateUrl: './bus-card.html'
})
export class BusCardComponent {
  bus = input.required<Bus>();

  protected readonly basket = inject(BasketService);

  protected get inBasket(): boolean {
    return this.basket.isInBasket(this.bus().id);
  }

  protected get duration(): string {
    const mins = (new Date(this.bus().arrival).getTime() - new Date(this.bus().departure).getTime()) / 60000;
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
    const b = this.bus();
    this.basket.add({
      type: 'bus',
      itemId: b.id,
      from: b.from,
      to: b.to,
      departure: b.departure,
      arrival: b.arrival,
      price: b.price,
      label: `${b.operator} · ${b.busNumber}`
    });
  }
}
