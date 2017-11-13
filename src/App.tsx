import * as React from 'react';
import './App.css';
import Loading from './Loading';
import {Collection, CollectionConsumer} from './Collection';
import Row from './Row'
import Label from './Label';
import { ErrorLevel } from './LabelConfiguration'

const logo = require('./logo.svg');

interface AppState {
  loaded: boolean,
  rows: Array<Row>
}

class App extends React.Component<{}, AppState> implements CollectionConsumer {
  collection: Collection = new Collection('https://spreadsheets.google.com/feeds/list/1s9I2ZKWe1vxnREiN-ztkVczRCKDOLXocSM9a-g841yk/1/public/values?alt=json')  

  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      rows: []
    };
  }

  componentDidMount() {
    this.collection.register(this);
    this.collection.update();
  }

  collectionDidUpdate(rows: Array<Row>) {
    this.setState({
      loaded: true,
      rows: rows
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
      if (this.state.rows.length > 0) {
        let i = 0
        let labels = this.state.rows.map((row: Row) => {
          i += 1;
          let props = {
            message: row.albumName,
            level: ErrorLevel.notice
          }
          return <Label key={i} {...props}/>
        })
        return (
          <div>
            {labels}
          </div>
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
