import * as React from 'react';
import './Loading.css';

export interface LoadingState {
  dots: number;
}

class Loading extends React.Component<{}, LoadingState> {
  timeoutId?: number
  constructor(props: any) {
    super(props)
    this.state = { 
      dots: 1
    }
  }
  
  componentDidMount() {
    this.timeoutId = window.setInterval(() => {
      let currentDots = this.state.dots
      let newState: LoadingState = { dots: currentDots + 1 }
      if (currentDots >= 3) {
        newState = { dots:  1 }
      }
      this.setState(newState)
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timeoutId !== undefined) {
      window.clearInterval(this.timeoutId);
    }
  }

  render() {
    return (
      <div className="Loading">
        Loading{this.renderDots()}
      </div>
    );
  }

  renderDots() {
    let dots = this.state.dots 
    return Array(dots).fill(".").join('')
  }
}

export default Loading;
