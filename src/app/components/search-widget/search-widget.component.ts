import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss'],
})
export class SearchWidgetComponent {
  @Input() book!: any;

  get thumbnail(): string {
    const url = this.book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
