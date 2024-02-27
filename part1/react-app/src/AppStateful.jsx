import { useState } from 'react'; //the file imports the useState function
/*
When the application starts, the code in AppStateful is executed. 
This code uses a useState hook to create the application state, setting an initial value of the variable counter. 
This component contains the Display component - which displays the counter's value, 0 - and three Button components. 
The buttons all have event handlers, which are used to change the state of the counter.

When one of the buttons is clicked, the event handler is executed. 
The event handler changes the state of the App component with the setCounter function. 
Calling a function that changes the state causes the component to re-render.

So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is re-rendered. 
This causes its subcomponents Display and Button to also be re-rendered. Display receives the new value of the counter, 1, as props. 
The Button components receive event handlers which can be used to change the state of the counter.
*/

const AppStateful = () => {
  const [counter, setCounter] = useState(0); //the function body that defines the component begins with the function call.
  console.log('rendering with counter value', counter);

  /*
  The function call adds state to the component and renders it initialized with the value of zero.
  The function returns an array that contains two items.
  We assign the items to the variables counter and setCounter by using the destructuring assignment syntax shown earlier.
  
  The application calls the setTimeout function 
  and passes it two parameters: a function to increment the counter state and a timeout of one second:
  () => setCounter(counter + 1)
  1000

  The function passed as the first parameter to the setTimeout function is invoked one second after calling the setTimeout function:
  () => setCounter(counter + 1)
  When the state modifying function setCounter is called, 
  React re-renders the component which means that the function body of the component function gets re-executed:
  */

  //setTimeout(() => setCounter(counter + 1), 1000);
  //console.log('rendering...', counter);

  /*
  The second time the component function is executed it calls the useState function and returns the new value of the state: 1.
  Executing the function body again also makes a new function call to setTimeout, which executes the one-second timeout and increments the counter state again.
  Because the value of the counter variable is 1, incrementing the value by 1 is essentially the same as an expression setting the value of counter to 2:
  () => setCounter(2)
  */

  // Meanwhile, the old value of counter : 1, is rendered to the screen.
  // Every time the setCounter modifies the state it causes the component to re-render. 
  // The value of the state will be incremented again after one second, and this will continue to repeat for as long as the application is running.

  const handleClick = () => {
    console.log("clicked with reference");
  }
  /*
  // we set the value of the button's onClick attribute to be a reference to the handleClick function
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
    </div>
  )
  */

  // The event handler function can also be defined directly in the value assignment of the onClick-attribute
  // The below codes achieve: the value of counter is increased by one and the component gets re-rendered.
  // Btw, the below codes defining event handlers within JSX-templates is not a good idea.
  /*  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>Clicked with Reference</button>
      <button onClick={() => console.log('clicked directly')}>Clicked directly</button>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  )
  */

  // Instead, we should separate the event handlers into separate functions. 
  // The value of the onClick attribute is a variable containing a reference to a function.
  // When the buttons are clicked and the AppStateful gets re-rendered, all of its children including Display component are also re-rendered.
  const increaseByOne = () => {
    console.log('increasing, value before', counter);
    setCounter(counter + 1);
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter);
    setCounter(counter - 1);
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    setCounter(0);
  }

  return (
    <div>
      <Display counter={counter} />

      <button onClick={increaseByOne}>+</button>
      <button onClick={setToZero}>Reset</button>

      <Button onClick={increaseByOne} text="+B" />
      <Button onClick={decreaseByOne} text="-B" />
      <Button onClick={setToZero} text="ResetB" />
    </div>
  )
}

//<button onClick={setCounter(counter + 1)}>+</button> 
// The above would cause error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
// An event handler is supposed to be either a function or a function reference.
// The above is actually a function call. In the beginning, the value of the counter variable is 0. 
// When React renders the component for the first time, it executes the function call setCounter(0+1), and changes the value of the component's state to 1.
// This will cause the component to be re-rendered, React will execute the setCounter function call again, and the state will change leading to another re-render...

// modify:
//<button onClick={() => setCounter(counter + 1)}>+</button>
// Now the button's attribute which defines what happens when the button is clicked:
// onClick - has the value () => setCounter(counter + 1)
// The setCounter function is called only when a user clicks the button.

// ------------------------Passing state - to child components---------------------------------
// Let's first implement a Display component that's responsible for displaying the value of the counter.
// Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.
/*
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
*/
/*
// The component only uses the counter field of its props. We can simplify the component by using destructuring:
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}
*/

// The function defining the component contains only the return statement, so we can define the function using the more compact form of arrow functions:
const Display = ({ counter }) => <div>{counter}</div>

// The event handler is passed to the Button component through the onClick prop.
// The name of the prop itself is not that significant, but our naming choice wasn't completely random.
// React's own official tutorial suggests: "In React, it’s conventional to use onSomething names for props which take functions which handle events and handleSomething for the actual function definitions which handle those events."
// By convention, event handler props should start with on, followed by a capital letter. For example, the Button component’s onClick prop could have been called onSmash:

/* 1:
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
*/

/* 2: We can use destructuring to get only the required fields from props, and use the more compact form of arrow functions
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
// Name convention: could also be called as:
const Button = ({ onSmash, text }) => {
  return (
    <button onClick={onSmash}>{text}</button>
  )
}
*/

// 3:
const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

export default AppStateful;
//https://react.dev/learn/state-a-components-memory