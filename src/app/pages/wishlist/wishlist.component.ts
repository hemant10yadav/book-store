import { Component } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  constructor(private wishlistService: WishlistService) {}

  get books(): any[] {
    return this.wishlistService.getAll();
  }

  remove(book: any, event: MouseEvent): void {
    event.stopPropagation();
    this.wishlistService.remove(book.id);
  }

  getThumbnail(book: any): string {
    const url = book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
