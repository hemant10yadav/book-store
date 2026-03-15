import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private readonly KEY = 'book_store_recently_viewed';
  private readonly MAX = 10;

  add(book: any): void {
    const list = this.getAll().filter((b) => b.id !== book.id);
    list.unshift(book);
    if (list.length > this.MAX) list.pop();
    localStorage.setItem(this.KEY, JSON.stringify(list));
  }

  getAll(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  }
}
