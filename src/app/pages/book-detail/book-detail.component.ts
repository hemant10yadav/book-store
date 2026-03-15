import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BookService } from '../../service/book.service';
import { WishlistService } from '../../service/wishlist.service';
import { RecentlyViewedService } from '../../service/recently-viewed.service';
import { ReadingStatusService, ReadingStatus } from '../../service/reading-status.service';
import { YouTubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public book: any;
  public loading = true;
  public error = false;

  public authorBooks: any[] = [];
  public similarBooks: any[] = [];
  public youtubeVideoUrl: SafeResourceUrl | null = null;
  public currentReadingStatus: ReadingStatus | null = null;
  public shareSuccess = false;

  public skeletonArray = [1, 2, 3, 4, 5, 6];

  public readonly readingStatusOptions: Array<{ val: ReadingStatus; label: string; icon: string }> = [
    { val: 'want-to-read', label: 'Want to Read', icon: 'bi-bookmark' },
    { val: 'reading', label: 'Reading', icon: 'bi-book-half' },
    { val: 'finished', label: 'Finished', icon: 'bi-check-circle' },
  ];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private wishlistService: WishlistService,
    private recentlyViewed: RecentlyViewedService,
    private readingStatusService: ReadingStatusService,
    private youtubeService: YouTubeService,
    private sanitizer: DomSanitizer,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.loading = true;
      this.error = false;
      this.authorBooks = [];
      this.similarBooks = [];
      this.youtubeVideoUrl = null;

      this.bookService.getBookById(id).subscribe({
        next: (book: any) => {
          this.book = book;
          this.loading = false;
          this.currentReadingStatus = this.readingStatusService.getStatus(book.id);
          this.recentlyViewed.add(book);
          this.loadRelatedContent();
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    });
  }

  private loadRelatedContent(): void {
    const author = this.book?.volumeInfo?.authors?.[0];
    const category = this.book?.volumeInfo?.categories?.[0];
    const title = this.book?.volumeInfo?.title;

    if (author) {
      this.bookService.getBooksByAuthor(author).subscribe({
        next: (res: any) => {
          this.authorBooks = (res.items || []).filter((b: any) => b.id !== this.book.id);
        },
        error: () => {},
      });
    }

    if (category) {
      this.bookService.getSimilarBooks(category).subscribe({
        next: (res: any) => {
          this.similarBooks = (res.items || [])
            .filter((b: any) => b.id !== this.book.id)
            .slice(0, 6);
        },
        error: () => {},
      });
    }

    if (title) {
      this.youtubeService.searchVideo(`${title} book trailer`).subscribe({
        next: (res: any) => {
          const videoId = res?.items?.[0]?.id?.videoId;
          if (videoId) {
            this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${videoId}`,
            );
          }
        },
        error: () => {},
      });
    }
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

  public setReadingStatus(status: ReadingStatus): void {
    if (!this.book) return;
    if (this.currentReadingStatus === status) {
      this.readingStatusService.removeStatus(this.book.id);
      this.currentReadingStatus = null;
    } else {
      this.readingStatusService.setStatus(this.book.id, status);
      this.currentReadingStatus = status;
    }
  }

  public share(): void {
    const title = this.book?.volumeInfo?.title || 'Check out this book';
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        this.shareSuccess = true;
        setTimeout(() => (this.shareSuccess = false), 2000);
      });
    }
  }

  public back(): void {
    this.location.back();
  }
}
