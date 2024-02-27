import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]
/* map always creates a new array, the elements of which have been created from the elements of the original array by mapping:
    using the function given as a parameter to the map method.
    The function is:

        note => note.id

    which is an arrow function in compact form. The full would be:

        (note) => {
          return note.id;
        }

    The function gets a note object as a parameter and returns the value of its id field.
*/

const result = notes.map(note => note.content);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)