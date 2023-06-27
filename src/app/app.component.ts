import { Component } from '@angular/core';
import { InMemoryCacheService } from './services/in-memory-cache.service';
import { InMemoryCache } from './models/in-memory-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  POLLING_DATA_LOCAL_STORAGE_KEY = 'polling';
  title = 'Nebula.InMemoryVisualizer';
  inMemoryCache: InMemoryCache = new InMemoryCache(new Map<string, string>());

  constructor(private inMemoryCacheService: InMemoryCacheService) {}

  ngOnInit(): void {
    this.inMemoryCacheService
      .getInMemoryCache()
      .subscribe((result: InMemoryCache) => {
        this.inMemoryCache = new InMemoryCache(new Map(Object.entries(result)));
      });

    this.initPollingOption();
  }

  onSelected(value: string): void {
    localStorage.setItem(this.POLLING_DATA_LOCAL_STORAGE_KEY, value);
  }

  private initPollingOption() {
    let pollingDuration = localStorage.getItem(
      this.POLLING_DATA_LOCAL_STORAGE_KEY
    );
    if (pollingDuration) {
      (<HTMLOptionElement>(
        document.getElementById(`polling_${pollingDuration}`)
      )).selected = true;
    }
  }
}
