import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Train } from '../../../../shared/models';
import { transitDuration, transitFormatDate, transitFormatTime, transitSeatColorClass } from '../../../../shared/utils/transit.utils';

@Component({
  selector: 'app-train-card',
  imports: [NgbTooltip],
  templateUrl: './train-card.html'
})
export class TrainCardComponent {
  train = input.required<Train>();

  protected readonly basket = inject(BasketService);

  protected get inBasket(): boolean {
    return this.basket.isInBasket(this.train().id);
  }

  protected get duration(): string { return transitDuration(this.train().departure, this.train().arrival); }
  protected get seatColorClass(): string { return transitSeatColorClass(this.train().seats); }
  protected formatTime(iso: string): string { return transitFormatTime(iso); }
  protected formatDate(iso: string): string { return transitFormatDate(iso); }

  protected addToBasket(): void {
    const t = this.train();
    this.basket.add({
      type: 'train',
      itemId: t.id,
      from: t.from,
      to: t.to,
      departure: t.departure,
      arrival: t.arrival,
      price: t.price,
      label: `${t.operator} · ${t.trainNumber}`
    });
  }
}
