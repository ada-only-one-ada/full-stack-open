import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  // uses the useState function to initialize the piece of state stored in notes with an empty array
  const [notes, setNotes] = useState(props.notes);

  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  // The event parameter is the event that triggers the call to the event handler function:
  // The event handler immediately calls the event.preventDefault() method, which prevents the default action of submitting a form. 
  // The default action would, among other things, cause the page to reload.
  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, //our note has a 50% chance of being marked as important.
      id: notes.length + 1,
    }
    console.log(noteObject.important);
    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  // The event handler is called every time a change occurs in the input element.
  // The event handler function receives the event object as its event parameter:
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }
  // The target property of the event object now corresponds to the controlled input element, 
  // and event.target.value refers to the input value of that element.

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 