import React from "react";
import "./SessionController.css";

function SessionController(props) {
  return (
    <div className="buttonController d-flex flex-column justify-content-center align-items-center">
      <span className="setting">Session Time:</span>
      <div className="d-flex flex-row justify-content-end align-items-center">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm setting-btn"
          onClick={props.decrementSessionTime}
        >
          -
        </button>
        <span className="time">{props.sessionTime}</span>
        <button
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
