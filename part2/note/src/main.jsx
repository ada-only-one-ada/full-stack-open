import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

// Axios' get method returns a promise
// A Promise is an object representing the eventual completion or failure of an asynchronous operation
// Pending, Fulfilled, Rejected 
/*
const promise = axios.get('http://localhost:3001/notes'); // fulfilled 
console.log(promise);
// If we want to access the result of the operation represented by the promise, we must register an event handler to the promise:
// The JS runtime environment calls the callback function registered by the 'then' method providing it with a 'response' object as a parameter.
// The 'response' object contains all the essential data related to the response of an HTTP GET request, which would include the returned data, status code, and header.
promise.then(response => {
  console.log(response);
})
*/

/*
//store the promise object is unnecessary.
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data;
  console.log(notes);
})
*/

// more readable 
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data;
    ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
    //console.log(notes);
  })

//const promise2 = axios.get('http://localhost:3001/foobar'); // make an HTTP GET request to a non-existent address: rejected 
//console.log(promise2);

/*
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

const result = notes.map(note => note.content);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
*/