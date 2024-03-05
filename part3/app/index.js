/*

// The app imports Node's built-in web server module, this is called CommonJS modules using 'require'.
const http = require('http') // 后端用这个
// These browser uses ES6 modules. Modules are defined with an export and taken into use with an import.
//import http from 'http'; // 前端react用这个，babel会compile to require

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// The createServer method of the http module to create a new web server.
// An event handler is registered to the server 
//  that is called every time an HTTP request is made to the server's address http://localhost:3001.
// The request is responded to with the status code 200, with the Content-Type header set to text/plain,
//  and the content of the site to be returned set to 'Hello world'.
const app = http.createServer((request, response) => {
    //response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.writeHead(200, { 'Content-Type': 'application/json' });
    //response.end('Hello World');
    response.end(JSON.stringify(notes));
})

const PORT = 3001;
// The code binds the http server assigned to the app variable, to listen to HTTP requests sent to port 3001.
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

*/

// using express
const express = require('express'); // importing express.
const app = express(); // a function that is used to creare an express application stored in the app variable.

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// define two routes to the application.
// This one defines an event handler that is used to handle HTTP GET requests made to the application's root.
// The event handler function accepts two parameters.
// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.

// Here, the request is answered by using the send method of the response object.
// Calling the method makes the server respond to the HTTP request by sending a response containing the string <h1>Hello World!</h1> that was passed to the send method.
// Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html.
// The status code of the response defaults to 200.
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>');
})

// This route defines an event handler that handles HTTP GET requests made to the notes path of the application.
// The request is responded to with the json method of the response object.
// Calling the method will send the notes array that was passed to it as a JSON formatted string.
// Express automatically sets the Content-Type header with the appropriate value of application/json.
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})