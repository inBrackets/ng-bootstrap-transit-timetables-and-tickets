import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Bus } from '../../../../shared/models';
import { transitDuration, transitFormatDate, transitFormatTime, transitSeatColorClass } from '../../../../shared/utils/transit.utils';

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

  protected get duration(): string { return transitDuration(this.bus().departure, this.bus().arrival); }
  protected get seatColorClass(): string { return transitSeatColorClass(this.bus().seats); }
  protected formatTime(iso: string): string { return transitFormatTime(iso); }
  protected formatDate(iso: string): string { return transitFormatDate(iso); }

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
