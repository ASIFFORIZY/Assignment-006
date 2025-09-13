# JavaScript ES6 Quick Notes ✨

Here’s a simple breakdown of some important ES6 concepts.  

---

## 1. var vs let vs const

- **var**: Old way of declaring variables. Function-scoped, can be re-declared, and often causes bugs because of hoisting.
- **let**: The modern replacement. Block-scoped and safer. You can re-assign values but not re-declare in the same scope.
- **const**: Also block-scoped. Once you assign a value, you can’t re-assign it (though objects/arrays inside can still be changed).

👉 Use **`let`** when the value will change, and **`const`** when it won’t. Forget about `var` in modern code.

---

## 2. map(), forEach(), filter()

All three are array methods but they do different jobs:

- **map()** → transforms each element and gives you a **new array**.  
- **forEach()** → just loops through items and runs your function. Doesn’t return a new array.  
- **filter()** → picks only the items that match a condition and returns a **new array**.  

Example:
```js
const numbers = [1, 2, 3, 4, 5];

numbers.map(n => n * 2);    // [2, 4, 6, 8, 10]
numbers.forEach(n => console.log(n)); // just logs
numbers.filter(n => n % 2 === 0); // [2, 4]
