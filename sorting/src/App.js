import React, { useState, useEffect } from "react";
import "./app.scss"

function App() {
  const [quantity, setQuantity] = useState(300)
  const [arr, setArr] = useState([])
  const [method, setMethod] = useState("Selection")

  // Creation of my array of bars
  useEffect(() => {
    let temp = []
    let color = "#0c0032"
    for (let i = 0; i < quantity; i++) {
      if (i % 4 === 0) { color = "#0c0032" } else if (i % 4 === 1) { color = "#240090" } else if (i % 4 === 2) { color = "#190061" } else { color = "#3500d3" }
      temp.push(<div key={i} className="bar" style={{ height: (i * 1 + 10), width: 10, background: color }} />)
    }
    setArr(temp)
  }, [])

  // Shuffle my array so it can be sorted
  const shuffle = () => {
    let random
    for (let i = 0; i < quantity; i++) {
      random = Math.floor(Math.random() * quantity)
      swap(i, random)
    }
    setArr([...arr])
  }

  // Selection Sort -> Find the smallest value and swap it with the first value of the array then increment the index and repeat until solved
  const selectionSort = async () => {
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
      await sleep()
      swap(i, index)
      i++
      setArr([...tempArr])
    }
  }

  // Bubble Sort -> Take the first 2 values and compare them, if the first is larger than the second, swap them otherwise continue to the next number.
  // Continue this through the whole array and then repeat until all values are in order.
  const bubbleSort = async () => {
    let bool = true
    let again = false
    while (bool) {
      for (let j = 0; j < quantity - 1; j++) {
        if (Number(arr[j].key) > Number(arr[j + 1].key)) {
          swap(j, j + 1)
          again = true
        }
      }
      await sleep()
      if (again === false) { bool = false }
      again = false
      setArr([...arr])
    }
  }

  // Insertion Sort -> Starts at the 1st index, compares to the 0th index. If the 1st index is smaller, then that number is removed. 
  // The array is looped over again and the number is inserted infront of the first number that is greater. This process continues with the 2nd index and so on.
  const insertionSort = async () => {
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
      await sleep()
      setArr([...tempArr])
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
    return returnDescription
  }

  // Time out function that allows you to see the process of the sorting algorithms
  const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, 10))
  }

  // A reusable function that swaps 2 items in an array
  const swap = (a, b) => {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
    return arr
  }

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

        {/* <input type="number" value={quantity} onChange={}></input> */}
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