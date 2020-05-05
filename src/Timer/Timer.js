import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  const timeFormat = () => {
    let min = Math.floor(props.timeLeftInSecond / 60);
    let sec = props.timeLeftInSecond - min * 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;
    return min + ":" + sec;
  };
  return (
    <div className="timer my-2">
      <div style={{ position: "absolute" }}>
        <CircularProgressbar
          styles={buildStyles({ textSize: 24 })}
          value={props.progressBarValue}
          maxValue={
            props.cycle === "Session"
              ? props.sessionForProgressBar
              : props.breakForProgressBar
          }
          strokeWidth={6}
        ></CircularProgressbar>
      </div>
      <div>
        <CircularProgressbarWithChildren
          styles={buildStyles({ textSize: 24 })}
          value={props.progressBarValue}
          maxValue={
            props.cycle === "Session"
              ? props.sessionForProgressBar
              : props.breakForProgressBar
          }
          strokeWidth={6}
        >
          <div id="timer-label" className="cycle">
            {props.cycle}
          </div>
          <div id="time-left" className="countDown">
            {timeFormat()}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default Timer;
