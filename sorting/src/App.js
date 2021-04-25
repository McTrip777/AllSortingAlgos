import React, { useState, useEffect } from "react";
import "./app.scss"

function App() {
  const [quantity, setQuantity] = useState(20)
  const [arr, setArr] = useState([])
  useEffect(() => {
    let temp = []
    for (let i = 0; i < quantity; i++) {
      temp.push(<div key={i} className="bar" style={{ height: (i * 10 + 10), width: 10 }} />)
    }
    setArr(temp)
  }, [])

  const shuffle = () => {
    let temp, random
    let tempArr = arr
    for (let i = 0; i < quantity; i++) {
      temp = tempArr[i]
      random = Math.floor(Math.random() * quantity)
      tempArr[i] = tempArr[random]
      tempArr[random] = temp
    }
    setArr(arr => [...tempArr])
  }

  return (
    <div className="App">
      <div className="barsContainer">
        {console.log(arr)}
        {arr}
      </div>
      <div className="buttonContainer">
        <button onClick={shuffle}>Shuffle</button>
        {/* <input type="number" value={quantity} onChange={}></input> */}
      </div>
    </div>
  );
}

export default App;
