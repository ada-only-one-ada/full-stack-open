const App = () => {
  const course = {
    name: '1.5.1 Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ parts }) => {
  const exercises1 = parts[0].exercises;
  const exercises2 = parts[1].exercises;
  const exercises3 = parts[2].exercises;
  return (
    <p>Total of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

export default App