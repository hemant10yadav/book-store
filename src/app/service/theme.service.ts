import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'book_store_theme';
  private _isDark = false;

  get isDark(): boolean {
    return this._isDark;
  }

  init(): void {
    this._isDark = localStorage.getItem(this.KEY) === 'dark';
    this.apply();
  }

  toggle(): void {
    this._isDark = !this._isDark;
    localStorage.setItem(this.KEY, this._isDark ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    if (this._isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
}
