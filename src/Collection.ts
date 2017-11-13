import Row from "./Row"

export interface CollectionConsumer {
  collectionDidUpdate(rows: Array<Row>): void;
}

export class Collection {
  url: string
  listeners: Array<CollectionConsumer> = []
  rows: Array<Row> = []
  constructor(url: string) {
    this.url = url
  }

  register(listener: CollectionConsumer) {
    this.listeners.push(listener)
  }

  update() {
    fetch(this.url).then((response) => {
      return response.json();
    }).then((json: any) => {
      let feed: Array<any> = json['feed']['entry'];
      if (feed === null) {
        throw new Error('Bad data');
      }
      this.rows = [];
      feed.forEach((value) => {
        let row = Row.deserialize(value);
        if (row != null) {
          this.rows.push(row);
        }
      });
      this.listeners.forEach((listener) => {
        listener.collectionDidUpdate(this.rows)
      })
    });
  }
}

