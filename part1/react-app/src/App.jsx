// The file App.jsx now defines a React component with the name App

/*
The App component will be rendered as a div-tag, which wraps a p-tag containing the text Hello World
Technically the component is defined as a JavaScript function. 
The following is a function (which does not receive any parameters), arrow function by ES6

() => (
  <div>
    <p>HelloWorld</p>
  </div>
)

The function is then assigned to a constant variable App: const App = ...
and the function returns the value of the expression.

Any JavaScript code within the curly braces is evaluated 
and the result of this evaluation is embedded into the defined place in the HTML produced by the component.
*/

/*Now the function defining the component has a parameter props. As an argument, the parameter receives an object, 
which has fields corresponding to all the "props" the user of the component defines.
Note: First letter of React component names must be capitalized.
*/

/* props is an object
props = {
  name: 'Arto Hellas',
  age: 35,
} 
*/

const HelloWithDestructuring = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>Hello With Destructuring {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}


const Hello = (props) => {
  // destructuring 
  // const name = props.name;
  // const age = props.age;

  // or this:
  const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age;
  /* above is same as below:
  const bornYear = () => {
    return new Date().getFullYear() - age;
  }
  */
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );

  /*
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  }

  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
  */
}

/* The logic for guessing the year of birth is separated into a function of its own that is called when the component is rendered.
The person's age does not have to bed passed as a parameter to the function, since it can directly access all props that are passed to the component.
*/

const Footer = () => {
  return (
    <div>
      <p>my name is footer</p>
    </div>
  );
}

const App = () => {
  const name = 'Peter';
  const age = 10;

  const friends = [
    { name: "cat", age: 1 },
    { name: "dog", age: 2 },
  ]

  const friendsArray = ["name1", "name2"];

  //extra div in the DOM tree, can use <></> to avoid 
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Daisy' age={1} />
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello />
      <br />
      <HelloWithDestructuring name="ada" age="27" />

      <br />
      <Footer />

      <br />
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>

      <br />
      <p>{friendsArray}</p>
    </div>
  );
}

/* using fragments to avoid an extra div element
return (
  <>
    <h1>...</h1>
    <p>...</p>
  </>
)
*/

/*
The layout of React components is mostly written using JSX. It looks like HTML, we are dealing with a way to writw JavaScript.
Under the hood, JSX returned by React components is compiled into JavaScript. Ater compiling, our application looks like this:

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}

The compilation is handled by Babel. Projects created with create-react-app or vite are configured to compile automatically.
In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces. 
The idea of JSX is quite similar to many templating languages, such as Thymeleaf used along with Java Spring, which are used on servers.

JSX is "XML-like", which means that every tag needs to be closed. 
For example, a newline is an empty element, which in HTML can be written as follows: <br>
but when writing JSX, the tag needs to be closed: <br />
*/

/*
Remove the last line will cause error:
Uncaught SyntaxError: The requested module '/src/App.jsx?t=1708901823080' does not provide an export named 'default' (at main.jsx:2:8),
which refers to: import App from './App' in main.jsx
*/
export default App;


