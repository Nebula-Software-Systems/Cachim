import { Injectable } from '@angular/core';
import { InMemoryCache } from '../models/in-memory-cache';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InMemoryCacheService {
  private url = 'InMemory';

  constructor(private http: HttpClient) {}

  public getInMemoryCache(): Observable<InMemoryCache> {
    return this.http.get<InMemoryCache>(`${environment.apiUrl}/${this.url}`);
  }
}
