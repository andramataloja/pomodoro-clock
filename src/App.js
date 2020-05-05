import React from "react";
import Timer from "./Timer/Timer";
import TimerController from "./TimerController/TimerController";
import ControllerSettings from "./ControllerSettings/ControllerSettings";
import bell from "./Servant-bell-sound.mp3";
import "./App.css";

const valBetween = (v) => {
  return Math.min(Math.max(parseInt(v), 1), 60);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: 25,
      breakTime: 5,
      timeLeftInSecond: 25 * 60,
      cycle: "Session",
      timerRunning: false,
      timerId: null,
      currentProgressBar: 0,
    };

    this.tick = this.tick.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.cycleControl = this.cycleControl.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.incrementSessionTime = this.incrementSessionTime.bind(this);
    this.incrementBreakTime = this.incrementBreakTime.bind(this);
    this.decrementSessionTime = this.decrementSessionTime.bind(this);
    this.decrementBreakTime = this.decrementBreakTime.bind(this);
  }

  startStopTimer() {
    if (!this.state.timerRunning) {
      this.setState({
        timerRunning: !this.state.timerRunning,
        timerId: setInterval(() => {
          this.tick();
          this.cycleControl();
        }, 1000),
      });
    } else {
      this.audio.pause();
      clearInterval(this.state.timerId);
      this.setState({
        timerRunning: !this.state.timerRunning,
        timerId: null,
      });
    }
  }

  tick() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1,
      currentProgressBar: this.state.currentProgressBar + 1,
    });
  }

  cycleControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audio.play();
    }
    if (this.state.timeLeftInSecond < 0) {
      if (this.state.cycle === "Session") {
        this.setState({
          cycle: "Break",
          timeLeftInSecond: this.state.breakTime * 60,
          currentProgressBar: 0,
        });
      } else {
        this.setState({
          cycle: "Session",
          timeLeftInSecond: this.state.sessionTime * 60,
          currentProgressBar: 0,
        });
      }
    }
  }

  resetTimer() {
    this.setState({
      timerRunning: false,
      sessionTime: 25,
      breakTime: 5,
      timeLeftInSecond: 25 * 60,
      timerId: null,
      cycle: "Session",
      currentProgressBar: 0,
    });
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.state.timerId);
  }

  incrementSessionTime() {
    if (!this.state.timerRunning) {
      this.setState({
        sessionTime: valBetween(this.state.sessionTime + 1),
        timeLeftInSecond: valBetween(this.state.sessionTime + 1) * 60,
        currentProgressBar: 0,
      });
    }
  }

  decrementSessionTime() {
    if (!this.state.timerRunning) {
      this.setState({
        sessionTime: valBetween(this.state.sessionTime - 1),
        timeLeftInSecond: valBetween(this.state.sessionTime - 1) * 60,
        currentProgressBar: 0,
      });
    }
  }

  incrementBreakTime() {
    if (!this.state.timerRunning) {
      this.setState({
        breakTime: valBetween(this.state.breakTime + 1),
        currentProgressBar: 0,
      });
    }
  }

  decrementBreakTime() {
    if (!this.state.timerRunning) {
      this.setState({
        breakTime: valBetween(this.state.breakTime - 1),
        currentProgressBar: 0,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Pomodoro Clock</h1>
        <ControllerSettings
          sessionTime={this.state.sessionTime}
          breakTime={this.state.breakTime}
          incrementSessionTime={this.incrementSessionTime}
          decrementSessionTime={this.decrementSessionTime}
          incrementBreakTime={this.incrementBreakTime}
          decrementBreakTime={this.decrementBreakTime}
        />
        <Timer
          cycle={this.state.cycle}
          timeLeftInSecond={this.state.timeLeftInSecond}
          progressBarValue={this.state.currentProgressBar}
          sessionForProgressBar={this.state.sessionTime * 60}
          breakForProgressBar={this.state.breakTime * 60}
        />
        <TimerController
          startStopTimer={this.startStopTimer}
          resetTimer={this.resetTimer}
          timerRunning={this.state.timerRunning}
        />
        <audio
          id="beep"
          preload="auto"
          src={bell}
          ref={(audio) => {
            this.audio = audio;
          }}
        ></audio>
      </div>
    );
  }
}
export default App;
