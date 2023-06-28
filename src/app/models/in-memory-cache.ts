export class InMemoryCacheRepresentation {
  key: string;
  value: string;
  expiration: Date;

  constructor(key: string, value: string, expiration: Date) {
    this.key = key;
    this.value = value;
    this.expiration = expiration;
  }
}
