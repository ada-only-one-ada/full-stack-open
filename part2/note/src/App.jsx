import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'; // The App component uses import to get access to the module.

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => { //was 'response'
        setNotes(initialNotes); // was 'response.data'
      })
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  // We create a new object for the note but omit the id property since it's better to let the server generate ids for our resources.
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    // The object is sent to the server using the axios post method.
    // The registered event handler logs the response that is sent back from the server to the console.
    /*
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data));
        setNewNote("");
        console.log(response)
      })
    */

    noteService
      .create(noteObject)
      .then(returnedNote => { // was 'response'
        setNotes(notes.concat(returnedNote)); // was 'response.data'
        setNewNote("");
      })
  }

  /*
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`; // This defines the unique URL for each note resource based on its id.
    const note = notes.find(n => n.id === id); // The array find method is used to find the note we want to modify, and we then assign it to the note variable.
    const changedNote = { ...note, important: !note.important }; // After this, we create (shallow copy) a new object that is an exact copy of the old note, apart from the important property that has the value flipped (from true to false or from false to true).

    //The new note is then sent with a PUT request to the backend where it will replace the old object.
    // The callback function sets the component's notes state to a new array that contains all the items from the previous notes array, 
    // except for the old note which is replaced by the updated version of it returned by the server:
    axios.put(url, changedNote)
      .then(response => {
        // The map method creates a new array by mapping every item from the old array into an item in the new array.
        // If the id is not the changed one, we simply copy the item from the old array into the new array.
        // If the id is the changed one, the note object returned by the server is addred to the array 
        setNotes(notes.map(n => n.id !== id ? n : response.data));
      })
  }
  */

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => { // was 'response'
        setNotes(notes.map(n => n.id !== id ? n : returnedNote)); // was 'n : response.data'
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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