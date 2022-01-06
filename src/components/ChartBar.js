import React from "react";
import "./ChartBar.scss";

function ChartBar(props) {
  const barStyle = {
    height: props.height,
    width: props.width,
    backgroundColor: props.color,
  };

  const arrowStyle = {
    borderColor: props.arrowColor,
  };

  return (
    <div className="chart-bar-container">
      <div className="chart-bar" style={barStyle}></div>
      <div className="chart-index">
        <i className="arrow" style={arrowStyle}></i>
      </div>
    </div>
  );
}

export default ChartBar;
