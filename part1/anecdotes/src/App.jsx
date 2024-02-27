import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([]);
  let [maxIndex, setMaxIndex] = useState(0);
  let [maxValue, setMaxValue] = useState(0);

  const handleSelectClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  }

  // Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.
  const handleVoteClick = () => {
    const copy = [...points];
    if (!copy[selected]) {
      copy[selected] = 0;
    }
    copy[selected] += 1;
    setPoints(copy);

    if (copy[selected] > maxValue) {
      setMaxIndex(selected);
      setMaxValue(copy[selected]);
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      <Points points={points} selected={selected} />
      <br />
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleSelectClick}>next anecdote</button>

      <Header text="Anecdote with most votes" />
      {anecdotes[maxIndex]}
      <Points points={points} selected={maxIndex} />
    </div>
  )
}

const Points = ({ points, selected }) => {
  if (points[selected] > 0) {
    return (
      <p>has {points[selected]} votes</p>
    )
  }
  return (
    <p>has 0 votes</p>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}
export default App