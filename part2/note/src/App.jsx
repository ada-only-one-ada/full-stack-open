import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  /* 
  The following function/effect is executed immediately after rendering. 
  The execution of the function results in effect being printed to the console, 
  and the command axios.get initiates the fetching of data from the server as well as registers the 'response' function as an event handler for the operation.
  */
  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      })
  }, []);
  // The function useEffect takes two parameters: 
  // The first is a function, the effect itselft: By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
  // So by default, the effect is always run after the component has been rendered. 
  // The second is used to specify how often the effect is run. If it is an empty array[], then the effect is only run along with the first render of the component.

  /*
  // A reference to an event handler function is assigned to the variable eventHandler. 
  // The promise returned by the get method of Axios is stored in the variable promise. 
  // The registration of the callback happens by giving the eventHandler variable, 
  // referring to the event-handler function, as a parameter to the then method of the promise. 
  useEffect(() => {
    console.log("effect");

    const eventHandlerRef = response => {
      console.log("promise fulfilled");
      setNotes(response.data);
    }
    const promise = axios.get("http://localhost:3001/notes");
    promise.then(eventHandlerRef);
  }, []);
  */

  // The body of the function defining the component is executed and the component is rendered for the first time.
  // At this point render 0 notes is printed, meaning datat hasn't been fetched from the server yet.
  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    console.log(noteObject.important);
    setNotes(notes.concat(noteObject));
    setNewNote('');
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