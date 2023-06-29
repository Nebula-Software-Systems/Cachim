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
    this.initRequestToFillCacheTable();
    this.periodicRetrievalOfCacheInformation();
  }

  onSelected(value: string): void {
    localStorage.setItem(this.POLLING_DATA_LOCAL_STORAGE_KEY, value);
  }

  private initPollingOption() {
    let pollingDuration = localStorage.getItem(
      this.POLLING_DATA_LOCAL_STORAGE_KEY
    ) as number | null;

    if (pollingDuration) {
      //set the element in local storage as the selected for the polling duration
      (<HTMLOptionElement>(
        document.getElementById(`polling_${pollingDuration}`)
      )).selected = true;
      this.polling_time_in_seconds = pollingDuration;
    } else {
      //use a default value for the polling
      (<HTMLOptionElement>(
        document.getElementById(
          `polling_${this.DEFAULT_POLLING_TIME_IN_SECONDS}`
        )
      )).selected = true;
    }
  }

  private initRequestToFillCacheTable(): void {
    this.retriveCacheDataFromServer();
  }

  private periodicRetrievalOfCacheInformation() {
    setInterval(
      () => this.retriveCacheDataFromServer(),
      this.polling_time_in_seconds * this.SECONDS_TO_MILLISECONDS_CONVERSION
    );
  }

  private retriveCacheDataFromServer(): void {
    this.inMemoryCacheService
      .getInMemoryCache()
      .subscribe((result: InMemoryCacheRepresentation[]) => {
        this.inMemoryCache = result;
      });
  }
}
