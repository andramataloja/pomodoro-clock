import React from "react";
import "./TimerController.css";

class TimerController extends React.Component {
  render() {
    return (
      <div>
        <button
          id="start_stop"
          type="button"
          className="btn btn-primary mr-2 mt-2"
          onClick={this.props.startStopTimer}
        >
          {this.props.timerRunning ? "Stop" : "Start"}
        </button>
        <button
          id="reset"
          type="button"
          className="btn btn-primary ml-2 mt-2"
          onClick={this.props.resetTimer}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default TimerController;
