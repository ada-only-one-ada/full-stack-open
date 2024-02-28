import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchWord, setNewSearchWord] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchWordChange = (event) => {
    setNewSearchWord(event.target.value);
  }

  //const notesToShow = showAll ? notes : notes.filter(note => note.important); 
  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(newSearchWord.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter label="filter shown with" newSearchWord={newSearchWord} handleSearchWordChange={handleSearchWordChange} />

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div >
  )
}

const Filter = ({ label, newSearchWord, handleSearchWordChange }) => {
  return (
    <form>
      <div>{label} <input value={newSearchWord} onChange={handleSearchWordChange} /></div>
    </form>
  )
}

const PersonForm = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name <input value={newName} onChange={handleNameChange} /></div>
      <div>number <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

//const Persons = ({ filteredPersons }) => filteredPersons.map(person => <Person key={person.id} person={person} />);
const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </>
  )
}

export default App

//https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/