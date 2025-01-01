import { useState } from "react"

const Button = (props) => {
  <button onClick={props.onClick}>
    {props.text}
  </button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const statUpdate = (good, bad) => {   
    setAverage(((bad * -1) + (good * 1))/(all + 1))
    setPositive(good / (all + 1) * 100)
    setAll(all + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    statUpdate(good + 1, bad)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    statUpdate(good, bad)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    statUpdate(good, bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}<br/>netural {neutral}<br/>bad {bad}<br/>all {all}<br/>average {average}<br/>positive {positive}%</p>
    </div>
  )
}

export default App