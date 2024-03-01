const Person = ({ person, toggleDelete }) => {
    return (
        <div>
            <span>{person.name} </span>
            <span>{person.number} </span>
            <span><button onClick={toggleDelete}>delete</button></span>
        </div>
    )
}

export default Person;