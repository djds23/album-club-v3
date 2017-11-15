import * as React from 'react';
import './Album.css';
import AlbumSelection from './AlbumSelection';

export interface AlbumProps {
  album: AlbumSelection;
}

class Album extends React.PureComponent<AlbumProps, {}> {
  render() {
    return (
        <div className=".Album-card">
          <p>{this.album().albumName}</p>
        </div>
    );
  }

  album () {
    return this.props.album;
  }
}

export default Album;
