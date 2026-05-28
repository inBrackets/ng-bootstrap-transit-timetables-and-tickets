import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../shared/services/basket.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgbCollapse],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass'
})
export class NavbarComponent {
  protected readonly basket = inject(BasketService);
  protected readonly collapsed = signal(true);
}
