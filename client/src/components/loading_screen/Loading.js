import React, { Component } from "react";

export default class Loading extends Component {
  state = {
    count: 0,
    message: "Almost there!"
  };

  componentDidMount() {
    this.interval = setInterval(() => this.countUp(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countUp = () => {
    this.setState(prev => {
      return {
        count: prev.count + 1
      };
    });
    this.changeWidth();
    if (this.state.count >= 100) {
      clearInterval(this.interval);
    }
  };

  changeWidth = () => {
    let div = document.getElementById("loading-page");
    div.style.width = `${this.state.count}%`;
  };

  render() {
    return (
      <div>
        <div id="loading-page">
          <div className="counter">
            <h1>
              {this.state.count < 100
                ? `${this.state.count}%`
                : this.state.message}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
