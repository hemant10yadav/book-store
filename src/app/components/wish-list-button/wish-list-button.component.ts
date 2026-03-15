import { Component, Input } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-wish-list-button',
  templateUrl: './wish-list-button.component.html',
  styleUrls: ['./wish-list-button.component.scss'],
})
export class WishListButtonComponent {
  @Input() public buttonWidth = 'w-218';
  @Input() public color: 'blue' | 'white' = 'blue';
  @Input() public topMargin = 'mt-0';
  @Input() public book: any;

  constructor(private wishlistService: WishlistService) {}

  get isWishlisted(): boolean {
    return this.book ? this.wishlistService.isWishlisted(this.book.id) : false;
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    if (this.book) {
      this.wishlistService.toggle(this.book);
    }
  }
}
