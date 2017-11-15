import * as React from 'react';
import './AlbumCollection.css';
import AlbumSelection from './AlbumSelection'
import Album from './Album'

export interface AlbumCollectionProps {
  albums: Array<AlbumSelection>
}

class AlbumCollection extends React.PureComponent<AlbumCollectionProps, {}> {
  render() {
    return (
        <div className=".AlbumCollection-container">
          {this.renderAlbums()}
        </div>
    );
  }

  renderAlbums() {
    let index = 0;
    return this.albums().map((album) => {
      index += 1;
      return <Album key={index} album={album}/>
    });
  }

  albums() {
    return this.props.albums;
  }
}

export default AlbumCollection;
