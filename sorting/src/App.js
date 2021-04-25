import React, { useState, useEffect } from "react";
import "./app.scss"

function App() {
  const [quantity, setQuantity] = useState(20)
  const [arr, setArr] = useState([])

  // Creation of my array of bars
  useEffect(() => {
    let temp = []
    for (let i = 0; i < quantity; i++) {
      temp.push(<div key={i} className="bar" style={{ height: (i * 10 + 10), width: 10 }} />)
    }
    setArr(temp)
  }, [])

  // Shuffle my array so it can be sorted
  const shuffle = () => {
    let temp, random
    let tempArr = arr
    for (let i = 0; i < quantity; i++) {
      temp = tempArr[i]
      random = Math.floor(Math.random() * quantity)
      tempArr[i] = tempArr[random]
      tempArr[random] = temp
    }
    setArr([...tempArr])
  }

  // Selection Sort -> Find the smallest value and swap it with the first value of the array then increment the index and repeat until solved
  const selectionSort = () => {
    let i = 0
    let tempArr = arr
    while (i < quantity) {
      let lowNum = quantity
      let index, temp
      for (let j = i; j < quantity; j++) {
        if (lowNum > Number(tempArr[j].key)) {
          lowNum = Number(tempArr[j].key)
          index = j
        }
      }
      temp = tempArr[i]
      tempArr[i] = tempArr[index]
      tempArr[index] = temp
      i++
    }
    setArr([...tempArr])
  }

  // Bubble Sort -> Take the first 2 values and compare them, if the first is larger than the second, swap them otherwise continue to the next number.
  // Continue this through the whole array and then repeat until all values are in order.
  const bubbleSort = () => {
    let bool = true
    let again = false
    let tempArr = arr
    while (bool) {
      let temp
      for (let j = 0; j < quantity - 1; j++) {
        if (Number(tempArr[j].key) > Number(tempArr[j + 1].key)) {
          temp = tempArr[j]
          tempArr[j] = tempArr[j + 1]
          tempArr[j + 1] = temp
          again = true
        }
      }
      if (again === false) { bool = false }
      again = false
    }
    setArr([...tempArr])
  }

  // Insertion Sort -> Starts at the 1st index, compares to the 0th index. If the 1st index is smaller, then that number is removed. 
  // The array is looped over again and the number is inserted infront of the first number that is greater. This process continues with the 2nd index and so on.
  const insertionSort = () => {
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
    }
    setArr([...tempArr])
  }


  return (
    <div className="App">
      <div className="barsContainer">
        {arr}
      </div>
      <div className="buttonContainer">
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={selectionSort}>Selection</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        {/* <input type="number" value={quantity} onChange={}></input> */}
      </div>
    </div>
  );
}

export default App;
