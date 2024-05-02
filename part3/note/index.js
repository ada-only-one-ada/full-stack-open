const express = require('express'); // importing express.
const app = express(); // a function that is used to creare an express application stored in the app variable.

app.use(express.static('dist'));
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

// Cross-orgin Resource Sharing 
const cors = require('cors');
app.use(cors());

//To access the data easily, we need the help of the express json-parser that we can use with the command app.use(express.json()).
app.use(express.json());
app.use(requestLogger);
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

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
    }, {
        id: 4,
        content: "ada ada ada",
        important: false
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>');
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
});

//create a route for fetching a single resource.
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id); //The id parameter in the route of a request can be accessed through the request object.
    //console.log(id);

    //const note = notes.find(note => note.id === id); //The find method of arrays is used to find the note with an id that matches the parameter. 
    //console.log(note);

    const note = notes.find(note => {
        //console.log(note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id;
    })

    //Since no data is attached to the response, we use the status method for setting the status 
    // and the end method for responding to the request without sending any data.
    if (note) {
        response.json(note);
    } else {
        response.status(404).end(); //undefined is falsy.
        //We do not need to display anything in the browser because REST APIs are interfaces that are intended for programmatic use, 
        // and the error status code is all that is needed.
    }

    response.json(note); //The note is then returned to the sender of the request.
});

//Deletion happens by making an HTTP DELETE request to the URL of the resource.
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    //If deleting the resource is successful, meaning that the note exists and is removed,
    // we respond to the request with the status code 204 no content and return no data with the response.
    response.status(204).end();
});

//Sending all the information for the new note in the request body in JSON format.
//The event handler function can access the data from the body property of the request object.
//Without the json-parser, the body property would be undefined.

const generateId = () => {
    //notes.map(n => n.id) creates a new array that contains all the ids of the notes
    //However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
    //The array can be transformed into individual numbers by using the "three dot" spread syntax
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0; //First, we find out the largest id number in the current list and assign it to the maxId variable
    return maxId + 1;
}

//The json-parser takes the JSON data of a request, transforms it into a JavaScript object 
//  and then attaches it to the body property of the request object before the route handler is called.
app.post('/api/notes', (request, response) => {
    //const note = request.body;
    //console.log(request.headers);
    //console.log(note); //For the time being, the application does not do anything with the received data besides printing it to the console and sending it back in the response.

    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note);
    response.json(note);
});

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
