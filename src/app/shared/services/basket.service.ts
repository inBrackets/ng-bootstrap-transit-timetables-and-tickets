import { Injectable, signal, computed } from '@angular/core';
import { BasketItem } from '../models';

const SESSION_KEY = 'transit-basket';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private readonly _items = signal<BasketItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);
  readonly total = computed(() => this._items().reduce((sum, i) => sum + i.price, 0));

  add(item: Omit<BasketItem, 'id' | 'addedAt'>): void {
    const entry: BasketItem = { ...item, id: crypto.randomUUID(), addedAt: new Date().toISOString() };
    this._items.update(list => [...list, entry]);
    this.persist();
  }

  remove(id: string): void {
    this._items.update(list => list.filter(i => i.id !== id));
    this.persist();
  }

  clear(): void {
    this._items.set([]);
    sessionStorage.removeItem(SESSION_KEY);
  }

  isInBasket(itemId: string): boolean {
    return this._items().some(i => i.itemId === itemId);
  }

  private load(): BasketItem[] {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as BasketItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(this._items()));
  }
}
