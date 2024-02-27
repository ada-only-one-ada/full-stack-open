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
      <Header text="1.7 give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Header text="statistics" />
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Total = ({ good, neutral, bad }) => <p>all {good + neutral + bad}</p>

const Average = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const score = good * 1 + neutral * 0 + bad * (-1);
  const average = total > 0 ? score / total : 0;
  return (
    <p>average {average}</p>
  )
}

const Positive = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const positive = total > 0 ? good / total : 0;
  return (
    <p>positive {positive * 100} %</p>
  )
}

export default App