// making random unsorted array
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
