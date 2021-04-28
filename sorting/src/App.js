import React, { useState, useEffect } from "react";
import "./app.scss"

function App() {
  const [quantity, setQuantity] = useState(100)
  const [arr, setArr] = useState([])
  const [method, setMethod] = useState("Selection")
  const [sorted, setSorted] = useState(true)

  // Creation of my array of bars
  useEffect(() => {
    let temp = []
    let color = "#0c0032"
    if (quantity <= 400 && quantity >= 100) {
      for (let i = 0; i < quantity; i++) {
        if (i % 4 === 0) { color = "#0c0032" } else if (i % 4 === 1) { color = "#240090" } else if (i % 4 === 2) { color = "#190061" } else { color = "#3500d3" }
        temp.push(<div key={i} className="bar" style={{ height: (i * 1 + 10), width: 10, background: color }} />)
      }
      setArr(temp)
    }
  }, [quantity])


  const checker = () => {
    let bool = false
    for (let i = 0; i < quantity - 1; i++) {
      if (Number(arr[i].key) !== Number(arr[i + 1].key) - 1) bool = true
    }
    setSorted(bool)
  }

  // Shuffle my array so it can be sorted
  const shuffle = () => {
    let random
    for (let i = 0; i < quantity; i++) {
      random = Math.floor(Math.random() * quantity)
      swap(i, random)
    }
    setArr([...arr])
    checker()
  }

  // Selection Sort -> Find the smallest value and swap it with the first value of the array then increment the index and repeat until solved
  const selectionSort = async () => {
    if (sorted) {
      let i = 0
      let tempArr = arr
      while (i < quantity) {
        let lowNum = quantity
        let index
        for (let j = i; j < quantity; j++) {
          if (lowNum > Number(tempArr[j].key)) {
            lowNum = Number(tempArr[j].key)
            index = j
          }
        }
        await sleep(20)
        swap(i, index)
        i++
        setArr([...tempArr])
      }
    }
    checker()
  }

  // Bubble Sort -> Take the first 2 values and compare them, if the first is larger than the second, swap them otherwise continue to the next number.
  // Continue this through the whole array and then repeat until all values are in order.
  const bubbleSort = async () => {
    if (sorted) {
      let bool = true
      let again = false
      while (bool) {
        for (let j = 0; j < quantity - 1; j++) {
          if (Number(arr[j].key) > Number(arr[j + 1].key)) {
            swap(j, j + 1)
            again = true
          }
        }
        if (again === false) { bool = false }
        again = false
        await sleep(20)
        setArr([...arr])
      }
    }
    checker()
  }

  // Insertion Sort -> Starts at the 1st index, compares to the 0th index. If the 1st index is smaller, then that number is removed. 
  // The array is looped over again and the number is inserted infront of the first number that is greater. This process continues with the 2nd index and so on.
  const insertionSort = async () => {
    if (sorted) {
      let val
      let tempArr = arr
      for (let i = 1; i < arr.length; i++) {
        if (Number(tempArr[i].key) < Number(tempArr[i - 1].key)) {
          val = tempArr.splice(i, 1)
          let bool = true
          let j = 0
          while (bool) {
            if (Number(val[0].key) < Number(tempArr[j].key)) {
              tempArr.splice(j, 0, val[0]);
              bool = false
            }
            j++
          }
        }
        await sleep(20)
        setArr([...tempArr])
      }
    }
    checker()
  }

  // Quick Sort -> this is a recursive function that subdivides the array with each recursive call and swaps values to the left/low if they are less than the pivot point 
  // or to the right/high if they are greater than the pivot point. 
  // The quick sort is responsible for subdividing the array
  // while partition is responsible for looping through the subdivided array and calling the swap method based on if the value is greater than or less than the pivot value.
  const quickSort = async (arr, low, high) => {
    if (sorted) {
      if (low < high) {
        let index = await partition(arr, low, high)
        await quickSort(arr, low, index - 1)
        await quickSort(arr, index + 1, high)
      }
    }
    checker()
  }
  const partition = async (arr, low, high) => {
    let pivot = Number(arr[high].key)
    let i = (low - 1)
    for (let j = low; j < high; j++) {
      if (Number(arr[j].key) < pivot) {
        i++
        await swap(i, j)
        await setArr([...arr])
        await sleep(10)
      }
    }
    await swap(i + 1, high)
    await setArr([...arr])
    await sleep(10)
    return (i + 1)
  }

  const radixSort = async (array) => {
    if (sorted) {
      let temp = array[0].key
      let maxVal = Number(temp[array[0].key])
      for (let i = 1; i < array.length; i++) {
        if (maxVal < Number(array[i].key)) { maxVal = Number(array[i].key) }
      }
      const iter = maxVal.toString().length
      for (let i = 0; i < iter; i++) {
        const newArr = Array.from({ length: 10 }, () => [])
        for (let j = 0; j < array.length; j++) {
          let temp = array[j].key
          const numberVal = Math.floor(Number(temp) / Math.pow(10, i)) % 10
          newArr[numberVal].push(array[j])
        }
        const tempArr = [].concat(...newArr)
        array = tempArr
      }
      setArr([...array])
    }
    checker()
  }

  const mergeSort = async (array) => {
    if (array.length > 1) {
      let middle = Math.floor(array.length / 2)
      let left = array.slice(0, middle)
      let right = array.slice(middle, array.length)
      await mergeSort(left)
      await mergeSort(right)

      let i = 0, j = 0, k = 0
      while (i < left.length && j < right.length) {
        console.log(Number(left[i].key), Number(right[j].key), left, right)
        if (Number(left[i].key) < Number(right[j].key)) {
          array[k] = left[i]
          await sleep(50)
          await setArr([...array])
          i += 1
        }
        else {
          array[k] = right[j]
          await sleep(50)
          await setArr([...array])
          j += 1
        }
        k += 1
      }
      while (i < left.length) {
        array[k] = left[i]
        await sleep(50)
        await setArr([...array])
        i += 1
        k += 1
      }
      while (j < right.length) {
        array[k] = right[j]
        await sleep(50)
        await setArr([...array])
        j += 1
        k += 1
      }
      // setArr([...array])
    }
  }

  // Takes state and determines which sort description to render
  const displayDescription = (value) => {
    let returnDescription
    if (value === "shuffle") {
      returnDescription = <div className="shuffle description">
        <h1>Shuffle</h1>
        <p>Shuffle works by iterating over every item in the array and swapping it with another item at a randomly generated index.</p>
      </div>
    } else if (value === "selection") {
      returnDescription = <div className="selection description">
        <h1>Selection Sort</h1>
        <p>The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.</p>
        <ol>
          <li> 1) The subarray which is already sorted.</li>
          <li>2) Remaining subarray which is unsorted.</li>
        </ol>
        <p>In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.</p>
      </div>
    } else if (value === "bubble") {
      returnDescription = <div className="bubble description">
        <h1>Bubble Sort</h1>
        <p>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.</p>
      </div>
    } else if (value === "insertion") {
      returnDescription = <div className="insertion description">
        <h1>Insertion Sort</h1>
        <p>Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.</p>
        <h2>Algorithm</h2>
        <p>To sort an array of size n in ascending order:</p>
        <ol>
          <li>1: Iterate from arr[1] to arr[n] over the array.</li>
          <li>2: Compare the current element (key) to its predecessor.</li>
          <li>3: If the key element is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up to make space for the swapped element.</li>
        </ol>
      </div >
    }
    else if (value === "quick") {
      returnDescription = <div className="quick description">
        <h1>Quick Sort</h1>
        <p>Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. </p>


        <ol>
          <li>1: Always pick first element as pivot.</li>
          <li>2: Always pick last element as pivot (implemented)</li>
          <li>3: Pick a random element as pivot.</li>
          <li>4: Pick median as pivot.</li>
        </ol>
        <p>The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.</p>
      </div >
    }
    return returnDescription
  }

  // A reusable function that swaps 2 items in an array
  const swap = (a, b) => {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
    return arr
  }

  // Time out function that allows you to see the process of the sorting algorithms
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const quantityChoice = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="App">
      <div className="buttonContainer">
        <button onClick={() => {
          shuffle()
          setMethod("shuffle")
        }}>Shuffle</button>
        <button onClick={() => {
          selectionSort()
          setMethod("selection")
        }}>Selection</button>
        <button onClick={() => {
          bubbleSort()
          setMethod("bubble")
        }}>Bubble Sort</button>
        <button onClick={() => {
          insertionSort()
          setMethod("insertion")
        }}>Insertion Sort</button>
        <button onClick={() => {
          quickSort(arr, 0, quantity - 1)
          setMethod("quick")
        }}>Quick Sort</button>
        <button onClick={() => {
          radixSort(arr)
          setMethod("radix")
        }}>Radix Sort</button>
        <button onClick={() => {
          mergeSort(arr)
          setMethod("merge")
        }}>Merge Sort</button>

        <input type="number" min="100" max="400" value={quantity} onChange={quantityChoice}></input>
      </div>
      <div className="barsContainer">
        {arr}
      </div>
      <div className="sortDescriptions">
        {displayDescription(method)}
      </div>

    </div>
  );
}

export default App;