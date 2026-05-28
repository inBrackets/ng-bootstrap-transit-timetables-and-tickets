import { Component, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../shared/services/basket.service';
import { Train } from '../../../../shared/models';

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

  protected get duration(): string {
    const mins = (new Date(this.train().arrival).getTime() - new Date(this.train().departure).getTime()) / 60000;
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
