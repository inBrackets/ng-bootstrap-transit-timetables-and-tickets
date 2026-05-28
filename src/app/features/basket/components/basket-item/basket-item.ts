import { Component, inject, input, output } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BasketItem } from '../../../../shared/models';
import { transitDuration, transitFormatDate, transitFormatTime } from '../../../../shared/utils/transit.utils';

const TYPE_META: Record<string, { icon: string; label: string }> = {
  train:  { icon: 'bi-train-front-fill text-primary', label: 'Train'  },
  flight: { icon: 'bi-airplane-fill text-info',       label: 'Flight' },
  bus:    { icon: 'bi-bus-front-fill text-success',   label: 'Bus'    }
};

@Component({
  selector: 'app-basket-item',
  imports: [NgbTooltip],
  templateUrl: './basket-item.html'
})
export class BasketItemComponent {
  item = input.required<BasketItem>();
  removed = output<string>();

  protected get typeIcon(): string  { return TYPE_META[this.item().type]?.icon  ?? 'bi-ticket'; }
  protected get typeLabel(): string { return TYPE_META[this.item().type]?.label ?? ''; }

  protected formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  protected formatTime(iso: string): string { return transitFormatTime(iso); }
  protected formatDate(iso: string): string { return transitFormatDate(iso); }
  protected get duration(): string { return transitDuration(this.item().departure, this.item().arrival); }

  protected remove(): void {
    this.removed.emit(this.item().id);
  }
}
