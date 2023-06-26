import { Component } from '@angular/core';
import { InMemoryCacheService } from './services/in-memory-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Nebula.InMemoryVisualizer';
  inMemoryCache: Map<string, string> = new Map<string, string>();

  constructor(private inMemoryCacheService: InMemoryCacheService) {}

  ngOnInit(): void {
    this.inMemoryCacheService
      .getInMemoryCache()
      .subscribe((result: Map<string, string>) => {
        this.inMemoryCache = new Map(Object.entries(result));
      });
  }
}
