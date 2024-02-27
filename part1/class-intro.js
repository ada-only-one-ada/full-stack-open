class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };

    greet() {
        console.log('hello, my name is ' + this.name);
    };
}

/* At the core, they are still objects based on JavaScript's prototypal inheritance. 
The type of both objects is actually Object, since JavaScript essentially only defines the types 
Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object.*/
const adam = new Person('Adam Ondra', 35);
adam.greet();

const janja = new Person('Janja Garnbret', 26);
janja.greet();

//https://github.com/petsel/not-awesome-es6-classes
//https://rajaraodv.medium.com/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview
//https://javascript.info/
//https://eloquentjavascript.net/
//https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP