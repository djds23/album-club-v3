class Row {
  chosenAt: string
  albumName: string
  artistName: string
  chosenBy: string
  embedCode: string

  static deserialize(obj: any): Row | null {
     let chosenAt: string = obj['gsx$chosenat']['$t'];
     if (chosenAt == null) return null;

     let albumName: string = obj['gsx$albumname']['$t'];
     if (albumName == null) return null;

     let artistName: string = obj['gsx$artistname']['$t'];
     if (artistName == null) return null;

     let chosenBy: string = obj['gsx$chosenby']['$t'];
     if (chosenBy == null) return null;

     let embedCode: string = obj['gsx$embedcode']['$t'];
     if (embedCode == null) return null;

     return new Row(chosenAt, albumName, artistName, chosenBy, embedCode);
  }

  constructor(chosenAt: string, albumName: string, artistName: string, chosenBy: string, embedCode: string) {
    this.chosenAt = chosenAt;
    this.albumName = albumName;
    this.artistName = artistName;
    this.chosenBy = chosenBy;
    this.embedCode = embedCode;
  }
}

export default Row;