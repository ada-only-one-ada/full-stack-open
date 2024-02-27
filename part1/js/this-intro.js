const arto = {
    name: "Arto Hellas",
    age: 35,
    education: "PHD",
    greet: function () {
        console.log("Hello, my name is " + this.name);
    },
}
//arto.greet(); // correctly print: Hello, my name is Arto Hellas

/* example1:
referenceToGreet()没有与任何obj绑定
const referenceToGreet = arto.greet; //TypeError: Cannot read properties of undefined (reading 'name')
referenceToGreet();*/

// using bind: this is bound to point to arto, independent of where and how the method is being called
// don't use arrow function.
const referenceToGreet = arto.greet.bind(arto);
referenceToGreet();

// TypeError: Cannot read properties of undefined (reading 'name')
/*
const test = (callback) => {
    callback();
}
test(arto.greet);
*/

/*  example2:
delay执行arto.greet这个function
setTimeout(callback, 1000)
把arto.greet看作一个整体的callback function
这个callback没有与任何一个object bind, 即不是obj.callback这样去call这个function，所以this找不到它的主体
when setTimeout is calling the method, it is the JS engine that actually calls the method and at that point, this refers to the global object*/
//setTimeout(arto.greet, 1000); // Hello, my name is undefined

/* when calling the method through a reference, the method loses knowledge of what the original this was.
In JavaScript, the value of this is defined based on how the method is called.
When calling the method through a reference, the value of this becomes the global object */

// https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth