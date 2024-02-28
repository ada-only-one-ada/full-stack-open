import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        id: newName,
      }

      setPersons(persons.concat(personObject));
      setNewName('');

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>

      {persons.map(person =>
        <div key={person.id}> {person.name}</div>
      )}
    </div >
  )
}

export default App

//https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/