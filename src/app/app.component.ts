import { Component } from '@angular/core';
import { InMemoryCacheService } from './services/in-memory-cache.service';
import { InMemoryCacheRepresentation } from './models/in-memory-cache';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  SECONDS_TO_MILLISECONDS_CONVERSION = 1000;
  polling_time_in_seconds: number = environment.defaultPollingIntervalInSeconds;
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
    localStorage.setItem(environment.localStoragePollingKey, value);
  }

  private initPollingOption() {
    let pollingDuration = localStorage.getItem(
      environment.localStoragePollingKey
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
          `polling_${environment.defaultPollingIntervalInSeconds}`
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
