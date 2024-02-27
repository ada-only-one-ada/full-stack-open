import { useState } from "react";

const AppComplex = () => {
    /* The component gets access to the functions setLeft and setRight that it can use to update the two pieces of state.
    {left: 0, right: 0}
    */

    // the below two lines is 'left' and 'right' counters are managed through separate pieces of state
    // this simplifies the update logic since you don't need to spread the previous state object — 
    //   you directly update the relevant piece of state: more suitable 
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    //Every click is stored in a separate piece of state called allClicks that is initialized as an empty array:
    const [allClicks, setAll] = useState([]);

    const [total, setTotal] = useState(0);

    // The component's state or a piece of its state can be of any type. 
    // We could implement the same functionality by saving the click count of both the left and right buttons into a single object
    const [clicks, setClicks] = useState({ left: 0, right: 0 })

    // when the left button is clicked, the following function is called:
    // note: the 'left' and 'right' counters are stored in a single state object
    //   This approach requires spreading the previous state and updating the part of the state you're interested in, 
    //   which can get cumbersome as the state object grows.
    /*
    const handleLeftClick = () => {
        const newClicks = {
            left: clicks.left + 1,
            right: clicks.right
        }
        setClicks(newClicks);
    }
    */
    const handleLeftClick = () => {
        /*The piece of state stored in allClicks is now set to be an array that contains all of the items of the previous state array plus the letter L. 
          Adding the new item to the array is accomplished with the concat method, which does not mutate the existing array but rather returns a new copy of the array with the item added to it.
          or using push:
          allClicks.push('L');
          setALl(allClicks);
          setLeft(left + 1);

          But don't use this. The state of React components like allClicks must not be mutated directly.
        */

        // A state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again.
        setAll(allClicks.concat("L"));
        console.log({ allClicks }); // console的是当前life cycle, 屏幕上显示的是下一个life cycle

        console.log("left before increasing", left);

        setLeft(left + 1); // React schedules an update to the component's state but does not immediately execute it. The state update and the subsequent re-rendering of the component happen asynchronously.
        console.log("left after increasing", left);
        //setTotal(left + right);

        // change to the correct below:
        const updatedeft = left + 1;
        setLeft(updatedeft);
        setTotal(updatedeft + right);
    }

    // {...clicks} creates a new object that has copies of all of the properties of the clicks object
    // when specify a particular property - left in {...clicks, left: 1}, the value of the left property in the new object will be 1
    // Assiging the object to a variable in the event handlers is not necessary and can be simplified:
    const handleLeftClickUsingSpread = () => {
        setClicks({ ...clicks, left: clicks.left + 1 });
    }
    /*
    And the following is set as the new state of the application
    {left: clicks.left + 1, rihgt: clicks.right}
    */

    /*
    const handleRightClick = () => {
        const newClicks = {
            left: clicks.left,
            right: clicks.right + 1
        }
        setClicks(newClicks);
    }
    */
    const handleRightClick = () => {
        setAll(allClicks.concat('R'));

        const updatedRight = right + 1;
        setRight(updatedRight);
        setTotal(left + updatedRight);
    }

    const handleRightClickUsingSpread = () => {
        const newClicks = {
            ...clicks,
            right: clicks.right + 1
        }
        setClicks(newClicks);
    }

    /*
    const handleLeftClick = () => {
      clicks.left++;
      setClicks(clicks);
    }
    The above is forbidden in React to mutate state directly.
    Changing state has to always be done by setting the state to a new object.
    If properties from the previous state object are not changed, they need to simply be copied, 
      which is done by copying those properties into a new object and setting that as the new state.
    */
    /*
     <button onClick={() => setLeft(left + 1)}>Left</button>
     <button onClick={() => setRight(right + 1)}>Right</button>
    */

    const A = {
        name: "yuqing",
        age: 27
    }
    const B = {
        name: "ada",
        anotherMe: A // an 'anotherMe' peoperty that references 'A'
    }
    // shallow copy: Creating a new object 'copy' that has the same top-level properties as 'B'
    // name:"ada" is copied by value, so it is direcly copied

    // the 'anotherMe' property of 'B' is copied by reference,
    // meaning 'copy.anotherMe' and 'B.anotherMe' both point to the same object 'A', there is no 'A' object created,
    // both 'copy' and 'B' reference the original 'A'
    // if we change 'A.age', that change is visible both 'B.anotherMe.age' and 'copy.anotherMe.age' becuase they reference the same 'A' object
    const copy = { ...B };
    //console.log({ copy });

    // deep copy specific nested objects while doing a shallow copy of the top-level object
    const deepCopy = { ...B, aotherMeDeepCopy: { ...A } };
    //console.log({ deepCopy })

    A.age = 100;
    A.name = "changeMyName"
    //console.log({ A });
    //console.log({ B });
    //console.log({ copy });
    //console.log({ deepCopy });

    return (
        <div>
            <Button handleClick={handleLeftClick} text="Left Button Component" />
            <Button handleClick={handleRightClick} text="right Button Component" />

            {left} : {right}

            <p>{allClicks.join(' ')}</p>
            <History allClicks={allClicks} />
            <p>total: {total}</p>

            <Button handleClick={handleLeftClickUsingSpread} text="Left Spread" />
            <Button handleClick={handleRightClickUsingSpread} text="Right Spread" />

            <button onClick={handleLeftClickUsingSpread}>Left Spread btn Not component</button>
            <button onClick={handleRightClickUsingSpread}>Right Spread btn Not component</button>
            {clicks.left} : {clicks.right}
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const History = (props) => {
    console.log("props is", props);
    if (props.allClicks.length === 0) {
        return (
            <div>
                The app is used by pressing the buttons.
            </div>
        )
    }
    return (
        <div>button press history: {props.allClicks.join(' ')}</div>
    )
}

export default AppComplex;