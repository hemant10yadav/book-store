import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../service/content.service';
import { BookCategory } from '../../../../utils/types';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from '../../../service/book.service';

@Component({
  selector: 'app-browse-by-age',
  templateUrl: './browse-by-age.component.html',
  styleUrls: ['./browse-by-age.component.scss'],
})
export class BrowseByAgeComponent implements OnInit {
  public activeAge!: { lower: number; upper: number | undefined };
  public lastPageNumberFetched = 0;

  public window = window;
  public categories: BookCategory[] = [];
  public pending = true;
  public noMoreData = false;
  public mustReadCategory: BookCategory[] = [];
  public ageGroups = this.cs.ageGroup;

  constructor(
    private cs: ContentService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private bookService: BookService,
  ) {}

  public ngOnInit() {
    this.actRoute.queryParams.subscribe((param: Params) => {
      this.lastPageNumberFetched = 0;
      this.categories = [];
      this.mustReadCategory = [];
      this.noMoreData = false;
      const { age } = param;
      this.activeAge = { lower: 0, upper: undefined };
      this.setAgeValues(age);
      this.getMustRead();
      this.getBooks();
    });
  }

  private setAgeValues(age: string) {
    if (age) {
      const a: number[] = age.split('-').map((val: string) => Number(val));
      if (a.length && !isNaN(a[0])) this.activeAge.lower = a[0];
      if (a.length >= 2 && !isNaN(a[1])) {
        this.activeAge.upper = a[1];
      } else {
        if ([0, 3, 6, 9].includes(this.activeAge.lower)) {
          this.activeAge.upper = this.activeAge.lower + 3;
        } else if (this.activeAge.lower !== 12) {
          this.setDefault();
        }
      }
    } else {
      this.setDefault();
    }
  }

  private setDefault() {
    this.activeAge.lower = 6;
    this.activeAge.upper = 9;
  }

  private getSubjectForAge(lower: number): string {
    if (lower <= 3) return 'baby+books';
    if (lower <= 7) return 'picture+books';
    if (lower <= 11) return 'middle+grade';
    return 'young+adult';
  }

  public getMustRead() {
    const mustReadSubjects = [
      { label: 'Must Read - Adventure', subject: 'adventure' },
      { label: 'Must Read - Classics', subject: 'classics' },
    ];
    mustReadSubjects.forEach(({ label, subject }) => {
      this.bookService.getMustReadBooks(subject).subscribe({
        next: (value: any) => {
          if (value.items?.length) {
            this.mustReadCategory.push({ category: label, books: value.items });
          }
        },
        error: () => {},
      });
    });
  }

  public getBooks() {
    this.pending = true;
    const subject = this.getSubjectForAge(this.activeAge.lower);
    const startIndex = this.lastPageNumberFetched * 20;
    this.bookService.getBooksByAgeGroup(subject, startIndex).subscribe({
      next: (value: any) => {
        const items: any[] = value.items || [];
        const label = `Books for Age ${this.getAgeGroup()}`;
        if (this.categories.length === 0) {
          this.categories.push({ category: label, books: items });
        } else {
          this.categories[0].books.push(...items);
        }
        this.lastPageNumberFetched++;
        this.noMoreData = items.length < 20;
        this.pending = false;
      },
      error: () => {
        this.pending = false;
      },
    });
  }

  public back(): void {
    this.location.back();
  }

  public isActive(lower: number, upper: number | undefined): boolean {
    return lower === this.activeAge.lower && upper === this.activeAge.upper;
  }

  public getAgeGroup(): string {
    let age = this.activeAge.lower.toString();
    if (this.activeAge.upper) {
      age += `-${this.activeAge.upper}`;
    } else {
      age += '+';
    }
    return age;
  }

  public onScroll(): void {
    this.getBooks();
  }

  public trackCategories(index: number, value: any) {
    return value.category;
  }

  public trackBooks(index: number, value: any) {
    return value.id;
  }
}
