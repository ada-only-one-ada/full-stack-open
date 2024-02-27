/*
Using forEach who will receive a function defined using the arrow syntax as a parameter:
value => {
    console.log(value);
}
forEach calls the function for each of the items in the array, always passing the individual
item as an argument. 
*/

const t = [2, 4, 6, 8];
const t2 = t.concat(10);
t.forEach(value => {
    console.log(value);
})

const m1 = t.map(value => value * 2);
console.log("m1 double is " + m1);

const m2 = t.map(value => '<li>' + value + '</li>');
console.log("m2 is " + m2);

const t3 = [1, 2, 3, 4, 5];
const [first, second, ...rest] = t3;
console.log("first is " + first, "second is " + second);
console.log("rest is " + rest);

// define objects using object literals, by listing its properties within braces
// The values of the properties can be of any type, like integers, strings, arrays, objects...
const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}
const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}
const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

// The properties of an objects are referenced by using the "dot" notation or brackets:
console.log("name is " + object1.name); //'Arto Hellas'
const fieldName = 'age';
console.log("age is " + object1[fieldName]); //35

// add properties by using dot notation or brackets:
object1.address = 'Helsinki';
console.log("address is " + object1.address);
console.log("another same address is " + object1['address']);

// This has to be done by using brackets because if using dot notation, 'secret number' is not
// a valid property name because of the space character 
object1['secret number'] = 12341;
console.log("secret number is " + object1['secret number']);

const sum = (p1, p2) => {
    console.log("first number to add is " + p1);
    console.log("second number to add is " + p2);
    return p1 + p2;
}
const result = sum(1, 5)
console.log("result of sum(1,5) is " + result);

const square = p => {
    console.log("number to be squared is " + p);
    return p * p;
}
console.log("square of 9 is " + square(9));

const squareCleaner = p => p * p;
console.log("cleaner code of square of 8 is " + squareCleaner(8));

const tSquared = t.map(p => p * p);// [2, 4, 6, 8] =>[4, 16, 36, 64]
console.log("square of [2,4,6,8] is " + tSquared);

// define functions by using the keyword 'function'
// 1. give a name in a function declaration
function product(a, b) {
    return a * b;
}
console.log("product of (2,6) is " + product(2, 6));

// 2.define the function by using a function expression, no need to give the function a name
const arverage = function (a, b) {
    return (a + b) / 2;
}
const res = arverage(2, 5);
console.log("average of (2,5) is " + res);

// object methods: "this" refers to the object itself
const arto = {
    name: "Arto Hellas",
    age: 35,
    education: "PHD",
    greet: function () {
        console.log("Hello, my name is " + this.name);
    },
    doAddition: function (a, b) {
        console.log(`${a} plus ${b} is ` + (a + b));
    },
}
arto.greet();

// Methods can be assigned to objects even after the creation of the object:
arto.growOlder = function () {
    this.age += 1;
}
console.log("Before call growOlder() age is " + arto.age);
arto.growOlder();
console.log("After call growOlder() age is " + arto.age);

arto.doAddition(1, 4);
// storing a method reference in a variable and calling the method through the variable:
const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15);