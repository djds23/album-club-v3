import * as React from 'react';
import './App.css';
import Loading from './Loading';
import {Collection, CollectionConsumer} from './Collection';
import AlbumSelection from './AlbumSelection'
import AlbumCollection from './AlbumCollection'
import Label from './Label';
import { ErrorLevel } from './LabelConfiguration'

const logo = require('./logo.svg');

interface AppState {
  loaded: boolean,
  albumSelections: Array<AlbumSelection>
}

class App extends React.Component<{}, AppState> implements CollectionConsumer {
  collection: Collection = new Collection('https://spreadsheets.google.com/feeds/list/1s9I2ZKWe1vxnREiN-ztkVczRCKDOLXocSM9a-g841yk/1/public/values?alt=json')  

  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      albumSelections: []
    };
  }

  componentDidMount() {
    this.collection.register(this);
    this.collection.update();
  }

  collectionDidUpdate(albumSelections: Array<AlbumSelection>) {
    this.setState({
      loaded: true,
      albumSelections: albumSelections
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>One Album</p> 
        </div>
        <div className="body">
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.loaded) {
      if (this.state.albumSelections.length > 0) {
        return (
          <AlbumCollection albums={this.state.albumSelections} />
        );
      } else {
        let props = {
          message: "Something went wrong!",
          level: ErrorLevel.warn
        }
        return (
          <Label {...props}/>
        );
      }
    } else {
      return (
        <Loading />
      );
    }  
  }
}

export default App;
