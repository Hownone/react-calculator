import { Player } from "./player";
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );





// var name = "hhn";
// var A = {
//   name: 'A',
//   talk: function () {
//     var s = () => console.log(this.name);
//     return s;
//     //console.log(this.name);
//   }
// }
// var talk = A.talk();
// talk();

// const person = {
//   name: "yxc",
//   talk: function() {
//     console.log(this);
//     //console.log(this.name);
//   }
// }

// person.talk();
// const tt = person.talk.bind(person);
// tt();

// const person = {
//   talk: function () {
//     setTimeout(() => {
//       console.log(this);
//     }, 1000);
//   }
// };

// person.talk();

const person = {
  name: "hhn",
  age: 18,
  height: 180,
}

const { name: new_name, age } = person;
const p = { ...person };

console.log(new_name, age);
p['index'] = 11;
console.log(p);
console.log(person);

let a = [1, 2, 3];
let b = [4, 5, 6];
let c = { ...a, 4: 6 };
console.log(c);
let s = "helloworld";
let ss = { ...s };
console.log([...s])
console.log(s);
console.log(ss);



// var num = 11;
// const obj1 = {
//   num: 22,
//   fn1: () => {
//     let num = 33;
//     const obj2 = {
//       num: 44,
//       fn2: function () {
//         console.log(this.num);
//       }
//     }
//     obj2.fn2();
//   }
// }

// obj1.fn1();


