import React, { useState } from "react";
import "./Settings.scss";

function Settings(props) {
  const [countItems, setCountItems] = useState(props.arrCount);
  const [countSpeed, setCountSpeed] = useState(props.speed);
  const [sort, setSort] = useState(props.sortingAlgorithm);
  const [arrType, setArrType] = useState(props.arrType);

  let maxItems = 75;
  const maxSortSpeed = 1000;

  return (
    <div className="settings">
      <div className="buttons">
        <button
          className="start"
          onClick={props.startSort}
          disabled={props.isSorting || props.isSorted}
        >
          start
        </button>
        <button className="reset" onClick={props.resetSort}>
          reset
        </button>
      </div>
      <div className="sliders">
        <div className="row">
          <label>Items </label>
          <input
            type="range"
            min="10"
            max={maxItems}
            value={props.arrCount}
            onChange={(e) => {
              setCountItems(e.target.value);
              props.setNewArrCount(e.target.value);
              props.setIsSorted(false);
            }}
            disabled={props.isSorting || props.isSorted}
          />
        </div>
        <div className="row">
          <label>Speed </label>
          <input
            className="speed"
            type="range"
            min="0.1"
            max={maxSortSpeed}
            value={props.speed}
            onChange={(e) => {
              setCountSpeed(e.target.value);
              props.setSpeed(e.target.value);
            }}
            disabled={props.isSorting || props.isSorted}
          />
        </div>
      </div>
      <div className="dropdown">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            props.setSortingAlgorithm(e.target.value);
          }}
          disabled={props.isSorting || props.isSorted}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <select
          value={arrType}
          onChange={(e) => {
            setArrType(e.target.value);
            props.setArrType(e.target.value);
          }}
          disabled={props.isSorting || props.isSorted}
        >
          <option value="random">Random</option>
          <option value="reverse">Reverse</option>
          <option value="nearly">Nearly</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
