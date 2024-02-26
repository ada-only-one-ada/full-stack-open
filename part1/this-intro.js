const arto = {
    name: "Arto Hellas",
    age: 35,
    education: "PHD",
    greet: function () {
        console.log("Hello, my name is " + this.name);
    },
    doAddition: function (a, b) {
        console.log(a + b);
    },
}
arto.greet(); // Hello, my name is Arto Hellas

const referenceToGreet = arto.greet; //TypeError: Cannot read properties of undefined (reading 'name')
referenceToGreet();

setTimeout(arto.greet, 1000); // Hello, my name is undefined