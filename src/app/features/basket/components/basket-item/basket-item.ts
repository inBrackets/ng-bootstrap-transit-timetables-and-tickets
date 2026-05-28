import { Component, inject, input, output } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketItem } from '../../../../shared/models';

@Component({
  selector: 'app-basket-item',
  imports: [NgbTooltip],
  templateUrl: './basket-item.html'
})
export class BasketItemComponent {
  item = input.required<BasketItem>();
  removed = output<string>();

  protected get typeIcon(): string {
    const icons: Record<string, string> = {
      train: 'bi-train-front-fill text-primary',
      flight: 'bi-airplane-fill text-info',
      bus: 'bi-bus-front-fill text-success'
    };
    return icons[this.item().type] ?? 'bi-ticket';
  }

  protected get typeLabel(): string {
    const labels: Record<string, string> = { train: 'Train', flight: 'Flight', bus: 'Bus' };
    return labels[this.item().type] ?? '';
  }

  protected formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  protected formatTime(iso: string): string {
    return iso.substring(11, 16);
  }

  protected get duration(): string {
    const mins = (new Date(this.item().arrival).getTime() - new Date(this.item().departure).getTime()) / 60000;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  protected remove(): void {
    this.removed.emit(this.item().id);
  }
}
