import axios from 'axios';
//const baseUrl = '/api/notes';
const baseUrl = 'http://localhost:3001/api/notes';

/* 
instead of the entire HTTP response, we would only get the response data. 
Using the module would then look like this:

noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
*/

// We no longer return the promise returned by axios directly. 
// Instead, we assign the promise to the request variable and call its then method:
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  //return request.then(response => response.data);
  return request.then(response => response.data.concat(nonExisting));
}
// The modified getAll function still returns a promise, as the then method of a promise also returns a promise.

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
}

/*
export default {
    //  the keys of the object : variables that are defined inside the module

    // Since the names of the keys and the assigned variables are the same,
    // we can write the object definition with a more compact syntax:
    getAll: getAll,
    create: create,
    update: update
}
*/

export default { getAll, create, update }

const name = 'Leevi';
const age = 0;
const personOldJs = {
  name: name,
  age: age
}
const personNewJs = { name, age };

/*
  The module returns an object that has three functions (getAll, create, update) as its properties that deal with notes.
  The functions directly return the promises returned by the axios methods.
*/