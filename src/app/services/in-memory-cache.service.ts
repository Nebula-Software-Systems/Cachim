import { Injectable } from '@angular/core';
import { InMemoryCacheRepresentation } from '../models/in-memory-cache';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InMemoryCacheService {
  constructor(private http: HttpClient) {}

  public getInMemoryCache(): Observable<InMemoryCacheRepresentation[]> {
    return this.http.get<InMemoryCacheRepresentation[]>(
      `${environment.apiUrl}${environment.inMemoryCacheRetrievalEndpoint}`
    );
  }
}
