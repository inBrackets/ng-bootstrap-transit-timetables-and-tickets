import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../shared/services/basket.service';
import { BasketItemComponent } from './components/basket-item/basket-item';

@Component({
  selector: 'app-basket',
  imports: [RouterLink, NgbAlert, BasketItemComponent],
  templateUrl: './basket.html'
})
export class BasketComponent {
  protected readonly basket = inject(BasketService);

  protected removeItem(id: string): void {
    this.basket.remove(id);
  }
}
