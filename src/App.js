import React, { useState, useEffect } from "react";
import "./App.scss";
import Chart from "./components/Chart.js";
import Settings from "./components/Settings.js";
import {
  getRandomArray,
  getReverseArray,
  getNearlySortedArray,
} from "./components/Functions.js";

function App() {
  if (
    localStorage.getItem("items") &&
    localStorage.getItem("speed") &&
    localStorage.getItem("sort") &&
    localStorage.getItem("array type")
  ) {
    var arrCountVar = parseInt(localStorage.getItem("items"));
    var speedVar = parseInt(localStorage.getItem("speed"));
    var sortingAlgorithmVar = localStorage.getItem("sort");
    var arrTypeVar = localStorage.getItem("array type");
  } else {
    var arrCountVar = 20;
    var speedVar = 50;
    var sortingAlgorithmVar = "bubble";
    var arrTypeVar = "random";
  }

  const [arrCount, setArrCount] = useState(arrCountVar);
  const [speed, setSpeed] = useState(speedVar);
  const [sortingAlgorithm, setSortingAlgorithm] = useState(sortingAlgorithmVar);
  const [arrType, setArrType] = useState(arrTypeVar);
  const [arr, setArr] = useState(getArr());
  const [arrIndexChange, setArrIndexChange] = useState(-1);
  const [arrowIndex, setArrowIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", arrCount);
    localStorage.setItem("speed", speed);
    localStorage.setItem("sort", sortingAlgorithm);
    localStorage.setItem("array type", arrType);
  }, [arrCount, speed, sortingAlgorithm, arrType]);

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  window.addEventListener("load", setVh);
  window.addEventListener("resize", setVh);

  useEffect(() => {
    setArr(getArr());
  }, [arrType]);

  function getArr() {
    if (arrType === "reverse") {
      return getReverseArray(arrCount);
    } else if (arrType === "nearly") {
      return getNearlySortedArray(arrCount);
    }
    return getRandomArray(arrCount);
  }

  let originalArr;

  function startSort() {
    setIsSorting(true);
    if (sortingAlgorithm === "bubble") {
      bubbleSort(arr);
    } else if (sortingAlgorithm === "selection") {
      selectionSort(arr);
    } else if (sortingAlgorithm === "insertion") {
      insertionSort(arr);
    } else if (sortingAlgorithm === "merge") {
      originalArr = [...arr];
      mergeSort(arr);
    }
  }

  function resetSort() {
    setIsSorted(false);
    if (isSorting) {
      window.location.reload();
    } else {
      setArr(getArr());
    }
  }

  function setNewArrCount(count) {
    setArrCount(count);
    setArr(getArr());
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
          await wait(speed * (2 / 3));
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
      await wait(speed * (2 / 3));
    }
    clearSorting();
  }

  // insertion sort
  async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      for (let j = i - 1; j >= 0 && arr[j] > temp; j--) {
        arr[j + 1] = arr[j];
        arr[j] = temp;
        setArrIndexChange(j);
        setArrowIndex(j);
        setArr(arr);
        await wait(speed);
      }
    }
    clearSorting();
  }

  // merge sort
  function merge(left, right) {
    let sortedArr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }
    const returnArr = [...sortedArr, ...left, ...right];
    updateMergeSortArr(getIndexRange(returnArr));
    return returnArr;
  }
  function mergeSort([...mergeArr]) {
    const half = mergeArr.length / 2;
    if (mergeArr.length <= 1) {
      return mergeArr;
    }
    const left = mergeArr.splice(0, half);
    const right = mergeArr;
    return merge(mergeSort(left), mergeSort(right));
  }
  function getIndexRange([...arrRange]) {
    let start = originalArr.indexOf(arrRange[0]);
    let end = start;
    for (let i = 0; i < arrRange.length; i++) {
      const index = originalArr.indexOf(arrRange[i]);
      if (index < start) start = index;
      if (index > end) end = index;
    }
    return [start, end];
  }
  async function updateMergeSortArr([...indexOfSortedArr]) {
    const start = indexOfSortedArr[0];
    const end = indexOfSortedArr[1];
    for (let i = end; i >= start; i--) {
      for (let j = end - 1; j >= start; j--) {
        if (arr[j + 1] < arr[j]) {
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
    setArrIndexChange(-1);
    setArrowIndex(-1);
  }

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
        arrType={arrType}
        setArrType={setArrType}
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
