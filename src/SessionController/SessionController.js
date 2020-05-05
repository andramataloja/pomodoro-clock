import React from "react";
import "./SessionController.css";

function SessionController(props) {
  return (
    <div
      id="session-label"
      className="buttonController d-flex flex-column justify-content-center align-items-center"
    >
      <span className="setting">Session Time:</span>
      <div className="d-flex flex-row justify-content-end align-items-center">
        <button
          id="session-decrement"
          type="button"
          className="btn btn-outline-primary btn-sm setting-btn"
          onClick={props.decrementSessionTime}
        >
          -
        </button>
        <span id="session-length" className="time">
          {props.sessionTime}
        </span>
        <button
          id="session-increment"
          type="button"
          className="btn btn-outline-primary btn-sm setting-btn"
          onClick={props.incrementSessionTime}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SessionController;
