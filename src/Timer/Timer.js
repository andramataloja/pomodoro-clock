import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

const timeFormat = timeLeftInSecond => {
  let min = Math.floor(timeLeftInSecond / 60);
  let sec = timeLeftInSecond - min * 60;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  return `${min}:${sec}`;
};

function Timer(props) {
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
          <div className="cycle">{props.cycle}</div>
          <div className="countDown">{`${timeFormat(
            props.timeLeftInSecond
          )}`}</div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default Timer;
