import React, { useState, useEffect } from "react";
import "./App.scss";
import Chart from "./components/Chart.js";
import Settings from "./components/Settings.js";
import { getRandomArray } from "./components/Functions.js";

function App() {
  if (localStorage.getItem("items")) {
    var arrCountVar = parseInt(localStorage.getItem("items"));
    var speedVar = parseInt(localStorage.getItem("speed"));
    var sortingAlgorithmVar = localStorage.getItem("sort");
  } else {
    var arrCountVar = 20;
    var speedVar = 50;
    var sortingAlgorithmVar = "bubble";
  }

  const [arrCount, setArrCount] = useState(arrCountVar);
  const [speed, setSpeed] = useState(speedVar);
  const [sortingAlgorithm, setSortingAlgorithm] = useState(sortingAlgorithmVar);
  const [arr, setArr] = useState(getRandomArray(arrCount));
  const [arrIndexChange, setArrIndexChange] = useState(-1);
  const [arrowIndex, setArrowIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", arrCount);
    localStorage.setItem("speed", speed);
    localStorage.setItem("sort", sortingAlgorithm);
  }, [arrCount, speed, sortingAlgorithm]);

  function startSort() {
    setIsSorting(true);
    if (sortingAlgorithm === "bubble") {
      bubbleSort(arr);
    } else if (sortingAlgorithm === "selection") {
      selectionSort(arr);
    }
  }

  function resetSort() {
    setIsSorted(false);
    if (isSorting) {
      window.location.reload();
    } else {
      setArr(getRandomArray(arrCount));
    }
  }

  function setNewArrCount(count) {
    setArrCount(count);
    setArr(getRandomArray(count));
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // bubble sort
  async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setArrowIndex(j);
        await wait(speed / 3);
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArrIndexChange(j + 1);
          setArrowIndex(j + 1);
          setArr(arr);
          await wait(speed);
        }
      }
    }
    clearSorting();
  }

  // selection sort
  async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let lowest = arr[i];
      let lowestIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        setArrowIndex(j);
        setArrIndexChange(lowestIndex);
        await wait(speed / 3);
        if (lowest > arr[j]) {
          lowest = arr[j];
          lowestIndex = j;
        }
      }
      const temp = arr[i];
      arr[i] = lowest;
      arr[lowestIndex] = temp;
      setArrIndexChange(i);
      setArrowIndex(i);
      setArr(arr);
      await wait(speed);
    }
    clearSorting();
  }

  // insertion sort

  function clearSorting() {
    setArrIndexChange(-1);
    setArrowIndex(-1);
    setIsSorting(false);
    setIsSorted(true);
  }

  return (
    <div className="App">
      <Settings
        startSort={startSort}
        resetSort={resetSort}
        arrCount={arrCount}
        setNewArrCount={setNewArrCount}
        speed={speed}
        setSpeed={setSpeed}
        sortingAlgorithm={sortingAlgorithm}
        setSortingAlgorithm={setSortingAlgorithm}
        isSorting={isSorting}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />
      <Chart
        arr={arr}
        arrCount={arrCount}
        arrIndexChange={arrIndexChange}
        arrowIndex={arrowIndex}
      />
    </div>
  );
}

export default App;
