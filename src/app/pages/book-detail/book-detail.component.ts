import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../../service/book.service';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public book: any;
  public loading = true;
  public error = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private wishlistService: WishlistService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(id).subscribe({
      next: (book: any) => {
        this.book = book;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  get thumbnail(): string {
    const url = this.book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }

  get isWishlisted(): boolean {
    return this.book ? this.wishlistService.isWishlisted(this.book.id) : false;
  }

  public toggleWishlist(): void {
    if (this.book) {
      this.wishlistService.toggle(this.book);
    }
  }

  public back(): void {
    this.location.back();
  }
}
