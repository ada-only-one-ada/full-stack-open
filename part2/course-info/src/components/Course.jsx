const Header = ({ course }) => <h3>{course}</h3>

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const array = parts.map(part => part.exercises);
    const total = array.reduce((total, val) => total + val, 0);

    return (
        <h4>total of {total} exercises</h4>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;