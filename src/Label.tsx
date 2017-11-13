import * as React from 'react';
import {ErrorLevel, LabelConfiguration} from './LabelConfiguration';
import './Label.css';

class Label extends React.PureComponent<LabelConfiguration, {}> {
  render() {
    return (
        <div className="Label">
          <span className={this.labelClassName()}>
            {this.props.message}
          </span>
        </div>
    );
  }

  labelClassName() {
    return this.props.level === ErrorLevel.warn ? 'Label-warn' : '';
  }
}

export default Label;
