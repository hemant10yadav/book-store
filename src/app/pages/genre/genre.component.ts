import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  public genre = '';
  public books: any[] = [];
  public pending = true;
  public noMoreData = false;
  private startIndex = 0;

  public skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.genre = params.get('name') || '';
      this.books = [];
      this.startIndex = 0;
      this.noMoreData = false;
      this.getBooks();
    });
  }

  public getBooks(): void {
    this.pending = true;
    this.bookService.getBooksByGenre(this.genre, this.startIndex).subscribe({
      next: (res: any) => {
        const items: any[] = res.items || [];
        this.books.push(...items);
        this.startIndex += items.length;
        this.noMoreData = items.length < 20;
        this.pending = false;
      },
      error: () => {
        this.pending = false;
      },
    });
  }

  public onScroll(): void {
    if (!this.pending && !this.noMoreData) {
      this.getBooks();
    }
  }

  get displayName(): string {
    return this.genre
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  getThumbnail(book: any): string {
    const url = book?.volumeInfo?.imageLinks?.thumbnail;
    return url ? url.replace('http:', 'https:') : 'assets/img/book3.png';
  }
}
