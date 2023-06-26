export class InMemoryCache {
  cache: Map<string, string>;

  constructor(cache: Map<string, string>) {
    this.cache = cache;
  }
}
