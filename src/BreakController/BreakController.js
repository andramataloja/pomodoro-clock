import React from "react";
import "../SessionController/SessionController.css";

function BreakController(props) {
  return (
    <div
      id="break-label"
      className=" buttonController d-flex flex-column justify-content-center align-items-center"
    >
      <span className="setting">Break Time:</span>
      <div className="d-flex flex-row justify-content-end align-items-center">
        <button
          id="break-decrement"
          type="button"
          className="btn btn-outline-primary btn-sm setting-btn setting-btn"
          onClick={props.decrementBreakTime}
        >
          -
        </button>
        <span id="break-length" className="time">
          {props.breakTime}
        </span>
        <button
          id="break-increment"
          type="button"
          className="btn btn-outline-primary btn-sm setting-btn setting-btn"
          onClick={props.incrementBreakTime}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default BreakController;
