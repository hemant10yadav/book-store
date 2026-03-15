import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../service/content.service';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public window = window;
  public ageGroup = this.cs.ageGroup;
  public newArrivals: any[] = [];
  public loadingNewArrivals = true;

  public topSellerBooks: any[] = [];
  public popularBooks: any[] = [];
  public teachersPick: any[] = [];

  public loadingTopSeller = true;
  public loadingPopular = true;
  public loadingTeachersPick = true;
  public errorTopSeller = false;
  public errorPopular = false;
  public errorTeachersPick = false;

  public mustReadSections: Array<{
    label: string;
    subject: string;
    books: any[];
    loading: boolean;
    error: boolean;
  }> = [
    { label: 'Adventure Books', subject: 'adventure', books: [], loading: true, error: false },
    { label: 'Science Fiction', subject: 'science+fiction', books: [], loading: true, error: false },
    { label: 'Classic Literature', subject: 'classics', books: [], loading: true, error: false },
  ];

  public skeletonArray = [1, 2, 3, 4, 5, 6];

  constructor(
    private cs: ContentService,
    private bookService: BookService,
  ) {}

  public ngOnInit(): void {
    this.getNewArrivals();
    this.getTopSellerBooks();
    this.getPopularBooks();
    this.getTeachersPick();
    this.loadMustReadSections();
  }

  public getNewArrivals(): void {
    this.bookService.getNewArrivalBooks().subscribe({
      next: (res: any) => {
        this.newArrivals = res.items || [];
        this.loadingNewArrivals = false;
      },
      error: () => {
        this.loadingNewArrivals = false;
      },
    });
  }

  public getTopSellerBooks(): void {
    this.loadingTopSeller = true;
    this.errorTopSeller = false;
    this.bookService.getTopSellerBooks().subscribe({
      next: (res: any) => {
        this.topSellerBooks = res.items || [];
        this.loadingTopSeller = false;
      },
      error: () => {
        this.errorTopSeller = true;
        this.loadingTopSeller = false;
      },
    });
  }

  private getPopularBooks(): void {
    this.bookService.getPopularBooks().subscribe({
      next: (res: any) => {
        this.popularBooks = res.items || [];
        this.loadingPopular = false;
      },
      error: () => {
        this.errorPopular = true;
        this.loadingPopular = false;
      },
    });
  }

  private getTeachersPick(): void {
    this.bookService.getTeachersPick().subscribe({
      next: (res: any) => {
        this.teachersPick = res.items || [];
        this.loadingTeachersPick = false;
      },
      error: () => {
        this.errorTeachersPick = true;
        this.loadingTeachersPick = false;
      },
    });
  }

  private loadMustReadSections(): void {
    this.mustReadSections.forEach((section) => {
      this.bookService.getMustReadBooks(section.subject).subscribe({
        next: (res: any) => {
          section.books = res.items || [];
          section.loading = false;
        },
        error: () => {
          section.error = true;
          section.loading = false;
        },
      });
    });
  }

  public getCalculatedValue(smallScreenValue: any, largeScreenValue: any): any {
    return window.screen.width < 600 ? smallScreenValue : largeScreenValue;
  }

  public getScrollPerClick(): number {
    return window.screen.width / 2;
  }
}
