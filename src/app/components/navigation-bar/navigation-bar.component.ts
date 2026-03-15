import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BookService } from '../../service/book.service';
import { debounceTime, distinctUntilChanged, filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements AfterViewInit {
  constructor(private bookService: BookService) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  public searchResult: any[] = [];
  public searchQuery: string = '';
  public focus = false;
  public searching = false;

  public closeNav(nav: HTMLElement): void {
    nav.classList.remove('show');
  }

  searchItems(event: KeyboardEvent): void {
    this.searching = true;
    this.bookService.searchBooks(this.searchQuery).subscribe({
      next: (results: any) => {
        this.searchResult = results.items || [];
        this.searching = false;
      },
      error: () => {
        this.searching = false;
      },
    });
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter(() => this.searchQuery.length >= 3),
      )
      .subscribe((event: KeyboardEvent) => {
        this.searchItems(event);
      });
  }

  public search(): void {
    this.searchResult = [];
    this.searchQuery = '';
  }
}
