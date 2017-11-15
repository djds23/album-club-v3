import AlbumSelection from "./AlbumSelection"

export interface CollectionConsumer {
  collectionDidUpdate(albumSelections: Array<AlbumSelection>): void;
}

export class Collection {
  url: string
  listeners: Array<CollectionConsumer> = []
  albumSelections: Array<AlbumSelection> = []
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
      this.albumSelections = [];
      feed.forEach((value) => {
        let albumSelection = AlbumSelection.deserialize(value);
        if (albumSelection != null) {
          this.albumSelections.push(albumSelection);
        }
      });
      this.listeners.forEach((listener) => {
        listener.collectionDidUpdate(this.albumSelections)
      })
    });
  }
}

