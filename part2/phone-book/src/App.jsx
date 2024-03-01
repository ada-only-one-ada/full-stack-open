import { useState, useEffect } from 'react'
import personService from './services/persons';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchWord, setNewSearchWord] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const toggleDeleteOf = id => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert(`this person has already been delete`);
        })
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

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(newSearchWord.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter label="filter shown with" newSearchWord={newSearchWord} handleSearchWordChange={handleSearchWordChange} />

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} toggleDeleteOf={toggleDeleteOf} />
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

//const Persons = ({ filteredPersons }) => filteredPersons.map(person => <Person key={person.id} person={person} />);
const Persons = ({ filteredPersons, toggleDeleteOf }) => {
  return (
    <>
      {filteredPersons.map(person => <Person key={person.id} person={person} toggleDelete={() => toggleDeleteOf(person.id)} />)}
    </>
  )
}

export default App

//https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/