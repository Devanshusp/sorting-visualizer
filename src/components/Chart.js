import React, { useState, useEffect } from "react";
import "./Chart.scss";
import ChartBar from "./ChartBar";

function Chart(props) {
  const [barWidth, setBarWidth] = useState(getBarWidth());
  const [maxBarHeight, setMaxBarHeight] = useState(getBarHeight());

  useEffect(() => {
    updateState();
  }, [props.arrCount]);

  window.addEventListener("resize", () => {
    updateState();
  });

  function getBarWidth() {
    let width = window.innerWidth;
    width = width / props.arrCount;
    width = width - width / 4;
    return width + "px";
  }

  function getBarHeight() {
    let height = window.innerHeight;
    if (height <= 365) {
      height = 235;
    } else {
      height = height - 130;
    }
    return height;
  }

  function updateState() {
    setBarWidth(getBarWidth());
    setMaxBarHeight(getBarHeight());
  }

  function getColor(index) {
    if (index === props.arrIndexChange) {
      return "white";
    } else {
      return "#3369ff";
    }
  }

  function getArrowColor(index) {
    if (index === props.arrowIndex) {
      return "#a9aebd";
    } else {
      return "transparent";
    }
  }

  return (
    <div className="container">
      <div className="chart">
        {props.arr.map((currentValue, index) => (
          <ChartBar
            key={currentValue}
            value={currentValue}
            height={(currentValue / props.arr.length) * maxBarHeight + "px"}
            width={barWidth}
            color={getColor(index)}
            arrowColor={getArrowColor(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Chart;
