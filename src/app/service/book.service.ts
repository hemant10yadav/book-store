import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private api: ApiService) {}

  public getNewArrivalBooks(): Observable<any> {
    return this.api.get<any>('volumes?q=subject:fiction&orderBy=newest&maxResults=6');
  }

  public getTopSellerBooks(): Observable<any> {
    return this.api.get<any>('volumes?q=subject:fiction&orderBy=relevance&maxResults=10');
  }

  public getPopularBooks(): Observable<any> {
    return this.api.get<any>('volumes?q=subject:children&maxResults=20&orderBy=relevance');
  }

  public getTeachersPick(): Observable<any> {
    return this.api.get<any>('volumes?q=subject:mystery&maxResults=20&orderBy=relevance');
  }

  public getMustReadBooks(subject: string): Observable<any> {
    return this.api.get<any>(`volumes?q=subject:${subject}&maxResults=10&orderBy=relevance`);
  }

  public getBookById(id: string): Observable<any> {
    return this.api.get<any>(`volumes/${id}`);
  }

  public getBooksByAgeGroup(ageQuery: string, startIndex = 0): Observable<any> {
    return this.api.get<any>(
      `volumes?q=${ageQuery}&maxResults=20&startIndex=${startIndex}&orderBy=relevance`,
    );
  }

  public searchBooks(query: string): Observable<any> {
    return this.api.get<any>(`volumes?q=${encodeURIComponent(query)}&maxResults=20`);
  }

  public getBooksByAuthor(author: string): Observable<any> {
    return this.api.get<any>(`volumes?q=inauthor:${encodeURIComponent(author)}&maxResults=6&orderBy=relevance`);
  }

  public getSimilarBooks(category: string): Observable<any> {
    return this.api.get<any>(`volumes?q=subject:${encodeURIComponent(category)}&maxResults=8&orderBy=relevance`);
  }

  public getBooksByGenre(genre: string, startIndex = 0): Observable<any> {
    return this.api.get<any>(`volumes?q=subject:${encodeURIComponent(genre)}&maxResults=20&startIndex=${startIndex}&orderBy=relevance`);
  }
}
