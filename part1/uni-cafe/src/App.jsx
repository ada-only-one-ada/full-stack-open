import { useState } from 'react'
/*
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

//Warning: validateDOMNesting(...): <tr> cannot appear as a child of <table> 
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
*/

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={total} />
          <StatisticLine label="average" value={((good - bad) / total).toFixed(1)} />
          <StatisticLine label="positive" value={((100 * good) / total).toFixed(1) + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>example solutions</h3>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App