import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header text="1.11 give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const obj = {
    total: total,
    average: ((good * 1 + neutral * 0 + bad * (-1)) / total).toFixed(1),
    positive: (good / total * 100).toFixed(1) + " %",
  }

  if (total > 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={obj.total} />
        <StatisticLine text="average" value={obj.average} />
        <StatisticLine text="positive" value={obj.positive} />
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

export default App