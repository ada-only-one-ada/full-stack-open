import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

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
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data;
    })
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

export default {
    getAll: getAll,
    create: create,
    update: update
}

/*
  The module returns an object that has three functions (getAll, create, update) as its properties that deal with notes.
  The functions directly return the promises returned by the axios methods.
*/