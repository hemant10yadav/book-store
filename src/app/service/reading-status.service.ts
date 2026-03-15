import { Injectable } from '@angular/core';

export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

@Injectable({ providedIn: 'root' })
export class ReadingStatusService {
  private readonly KEY = 'book_store_reading_status';

  getAll(): { [bookId: string]: ReadingStatus } {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '{}');
    } catch {
      return {};
    }
  }

  getStatus(bookId: string): ReadingStatus | null {
    return this.getAll()[bookId] || null;
  }

  setStatus(bookId: string, status: ReadingStatus): void {
    const all = this.getAll();
    all[bookId] = status;
    localStorage.setItem(this.KEY, JSON.stringify(all));
  }

  removeStatus(bookId: string): void {
    const all = this.getAll();
    delete all[bookId];
    localStorage.setItem(this.KEY, JSON.stringify(all));
  }
}
