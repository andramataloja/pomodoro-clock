import React from "react";
import Timer from "./Timer/Timer";
import TimerController from "./TimerController/TimerController";
import ControllerSettings from "./ControllerSettings/ControllerSettings";
import bell from "./Servant-bell-sound.mp3";
import "./App.css";

let defaultSessionTime = "25";
let defaultBreakTime = "5";

const valBetween = v => {
  return Math.min(Math.max(parseInt(v), 1), 60);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: Number.parseInt(defaultSessionTime, 10),
      breakTime: Number.parseInt(defaultBreakTime, 10),
      timeLeftInSecond: Number.parseInt(defaultSessionTime, 10) * 60,
      cycle: "Session",
      timerRunning: false,
      timerId: null,
      currentProgressBar: 0
    };
    this.audioSound = React.createRef();

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
        }, 1000)
      });
    } else {
      this.audioSound.current.pause();
      clearInterval(this.state.timerId);
      this.setState({
        timerRunning: !this.state.timerRunning,
        timerId: null
      });
    }
  }

  tick() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1,
      currentProgressBar: this.state.currentProgressBar + 1
    });
  }

  cycleControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioSound.current.play();
      if (this.state.cycle === "Session") {
        this.setState({
          cycle: "Break",
          timeLeftInSecond: this.state.breakTime * 60,
          currentProgressBar: 0
        });
      } else {
        this.setState({
          cycle: "Session",
          timeLeftInSecond: this.state.sessionTime * 60,
          currentProgressBar: 0
        });
      }
    }
  }

  resetTimer() {
    this.setState({
      timerRunning: false,
      sessionTime: Number.parseInt(defaultSessionTime, 10),
      breakTime: Number.parseInt(defaultBreakTime, 10),
      timeLeftInSecond: Number.parseInt(defaultSessionTime, 10) * 60,
      timerId: null,
      cycle: "Session",
      currentProgressBar: 0
    });
    this.audioSound.current.pause();
    clearInterval(this.state.timerId);
    console.log("Reset");
  }

  incrementSessionTime() {
    if (!this.state.timerRunning) {
      this.setState({
        sessionTime: valBetween(this.state.sessionTime + 1),
        timeLeftInSecond: valBetween(this.state.sessionTime + 1) * 60,
        currentProgressBar: 0
      });
    }
  }

  decrementSessionTime() {
    if (!this.state.timerRunning) {
      this.setState({
        sessionTime: valBetween(this.state.sessionTime - 1),
        timeLeftInSecond: valBetween(this.state.sessionTime - 1) * 60,
        currentProgressBar: 0
      });
    }
  }

  incrementBreakTime() {
    if (!this.state.timerRunning) {
      this.setState({
        breakTime: valBetween(this.state.breakTime + 1),
        currentProgressBar: 0
      });
    }
  }

  decrementBreakTime() {
    if (!this.state.timerRunning) {
      this.setState({
        breakTime: valBetween(this.state.breakTime - 1),
        currentProgressBar: 0
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
          id="bell"
          preload="auto"
          src={bell}
          ref={this.audioSound}
        ></audio>
      </div>
    );
  }
}
export default App;
