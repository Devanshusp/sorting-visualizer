// make a random unsorted array
export function getRandomArray(length) {
  const arr = [];
  const randomArr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  for (let j = 1; j <= length; j++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return randomArr;
}

// make a reversed array
export function getReverseArray(length) {
  const arr = [];
  for (let i = length; i >= 1; i--) {
    arr.push(i);
  }
  return arr;
}

// make an nearly sorted array
export function getNearlySortedArray(length) {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  let nearlySortedArr = [];
  let randomLength = Math.floor(length / 4);
  while (arr.length > 0) {
    const length = arr.length > randomLength ? randomLength : arr.length;
    const tempArr = arr.splice(0, length);
    while (tempArr.length > 0) {
      nearlySortedArr.push(
        tempArr.splice(Math.floor(Math.random() * tempArr.length), 1)[0]
      );
    }
  }
  return nearlySortedArr;
}
