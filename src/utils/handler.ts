export class Handler<T = object> {
  public data: T[];
  constructor(data: T[]) {
    this.data = data;
  }
  getRandom(): T {
    const random = Math.floor(Math.random() * this.data.length);
    const randomItem = this.data[random];
    return randomItem;
  }
  filterBy<K extends keyof T>(value: T[K], key: K) {
    return this.data.filter((item) => item[key] === value);
  }
}
