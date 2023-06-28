import { Component } from '@angular/core';
import { InMemoryCacheService } from './services/in-memory-cache.service';
import { InMemoryCacheRepresentation } from './models/in-memory-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  POLLING_DATA_LOCAL_STORAGE_KEY: string = 'polling';
  DEFAULT_POLLING_TIME_IN_SECONDS: number = 10;
  SECONDS_TO_MILLISECONDS_CONVERSION = 1000;
  polling_time_in_seconds: number = this.DEFAULT_POLLING_TIME_IN_SECONDS;
  title = 'Nebula.InMemoryVisualizer';
  inMemoryCache: InMemoryCacheRepresentation[] =
    new Array<InMemoryCacheRepresentation>();

  constructor(private inMemoryCacheService: InMemoryCacheService) {}

  ngOnInit(): void {
    this.initPollingOption();

    setInterval(() => {
      this.inMemoryCacheService
        .getInMemoryCache()
        .subscribe((result: InMemoryCacheRepresentation[]) => {
          this.inMemoryCache = result;
        });
    }, this.polling_time_in_seconds * this.SECONDS_TO_MILLISECONDS_CONVERSION);
  }

  onSelected(value: string): void {
    localStorage.setItem(this.POLLING_DATA_LOCAL_STORAGE_KEY, value);
  }

  private initPollingOption() {
    let pollingDuration = localStorage.getItem(
      this.POLLING_DATA_LOCAL_STORAGE_KEY
    ) as number | null;

    if (pollingDuration) {
      (<HTMLOptionElement>(
        document.getElementById(`polling_${pollingDuration}`)
      )).selected = true;
      this.polling_time_in_seconds = pollingDuration;
    } else {
      (<HTMLOptionElement>(
        document.getElementById(`polling_${pollingDuration}`)
      )).selected = true;
    }
  }
}
