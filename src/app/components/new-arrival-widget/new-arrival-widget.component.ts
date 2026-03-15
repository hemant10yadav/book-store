import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-arrival-widget',
  templateUrl: './new-arrival-widget.component.html',
  styleUrls: ['./new-arrival-widget.component.scss'],
})
export class NewArrivalWidgetComponent {
  @Input() public book!: any;
  @Input() public index = 0;

  get thumbnail(): string {
    const url = this.book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
