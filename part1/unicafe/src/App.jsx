import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.label} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine label="good" value={props.good} />
      <StatisticLine label="neutral" value={props.neutral} />
      <StatisticLine label="bad" value={props.bad} />
      <StatisticLine label="all" value={props.all} />
      <StatisticLine label="average" value={props.average} />
      <StatisticLine label="positive" value={props.positive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const statUpdate = (good, bad) => {
    setAverage(((bad * -1) + (good * 1)) / (all + 1))
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
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App