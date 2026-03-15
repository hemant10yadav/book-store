import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly KEY = 'book_store_wishlist';

  getAll(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  }

  isWishlisted(bookId: string): boolean {
    return this.getAll().some((b) => b.id === bookId);
  }

  toggle(book: any): void {
    const list = this.getAll();
    const idx = list.findIndex((b) => b.id === book.id);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(book);
    }
    localStorage.setItem(this.KEY, JSON.stringify(list));
  }

  remove(bookId: string): void {
    const list = this.getAll().filter((b) => b.id !== bookId);
    localStorage.setItem(this.KEY, JSON.stringify(list));
  }
}
