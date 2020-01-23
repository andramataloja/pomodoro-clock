import React from "react";
import BreakController from "../BreakController/BreakController";
import SessionController from "../SessionController/SessionController";
import "./ControllerSettings.css";

class ControllerSettings extends React.Component {
  render() {
    return (
      <div className="controllerSettings">
        <SessionController
          sessionTime={this.props.sessionTime}
          incrementSessionTime={this.props.incrementSessionTime}
          decrementSessionTime={this.props.decrementSessionTime}
        />
        <BreakController
          breakTime={this.props.breakTime}
          incrementBreakTime={this.props.incrementBreakTime}
          decrementBreakTime={this.props.decrementBreakTime}
        />
      </div>
    );
  }
}

export default ControllerSettings;
