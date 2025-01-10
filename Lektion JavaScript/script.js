console.log("Hello Woorld!");

let testnumber = 42;
console.log ("The value of our variable is", testnumber);

let firstname = "Batoul";
const year = "2024"; 


console.log(firstname, year);

let text = "Hello";
let number = 42;
let isStudent = true;
let nothing = null;
let notDefined;
console.log(text, number, isStudent, nothing, notDefined);

let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

let fruitObject = [
    {name: "Apple", color: "Green" },
    {name: "Banana", color: "Yellow"},
];

console.log(fruitObject);
console.log(fruitObject[0].color);

let student = {
    name: "Batoul",
    age: 32,
    isEnrolled: true,
};

student.isEnrolled = false;

console.log(student);

const greet = (firstName) => {
    return `Hello, ${firstName}`;
  };
  
console.log(greet("Batoul"));

let age = 18;

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.")
    }
let isEnrolledStudent = false;

if (isEnrolledStudent) {
      console.log("Student is enrolled");
} else {
    console.log("Student is not enrolled.");
}
let fruitList = ["Apple", "Banana", "Cherry",];
console.log(fruitList);
for ( let fruit of fruitList) {
    console.log(fruit);
}
for (let i = 0; i < 5; i++) {
    console.log("Iteration:", i);
  }