import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class YouTubeService {
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  searchVideo(query: string): Observable<any> {
    const params = `part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${environment.apiKey}`;
    return this.http.get<any>(`${this.apiUrl}?${params}`);
  }
}
