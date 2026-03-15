import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popular-widget',
  templateUrl: './popular-widget.component.html',
  styleUrls: ['./popular-widget.component.scss'],
})
export class PopularWidgetComponent {
  @Input() public book!: any;
  @Input() mode: 'light' | 'dark' = 'light';

  get thumbnail(): string {
    const url = this.book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
