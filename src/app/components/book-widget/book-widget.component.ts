import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-widget',
  templateUrl: './book-widget.component.html',
  styleUrls: ['./book-widget.component.scss'],
})
export class BookWidgetComponent {
  @Input() public book!: any;
  @Input() public index!: number | null;
  @Input() mode: 'light' | 'dark' = 'light';

  get thumbnail(): string {
    const url = this.book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
