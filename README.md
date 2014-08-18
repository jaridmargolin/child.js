child.js [![Build Status](https://travis-ci.org/jaridmargolin/child.js.png)](https://travis-ci.org/jaridmargolin/child.js)
===

Inheritance for Javascript. Cleanly sets a usable prototype chain. Code closely mirrors and was based off of `Backbone.extend`. Packaged to be used in various environments (AMD, COMMON, UMD, STANDALONE).



## API


### child(Parent, child)

Create a a new object whos prototype chain includes the specified parent element. The constructor of the child element will be the same as the parents (called with correct context), unless passed in as a property of the child object.

#### Parameters

* **\*Parent**: Object -- Object to "inherit" from.
* **\*child**: Object -- Object containing the methods/properties to add new objects prototype. This essentially is an object representing your new class...

**Example:**

```
var Parent = function (name) {
  this.name = name
}

var Child = child(Object, {
  sayHi: function () {
    console.log('Hi ' + this.name + '!');
  }
});

var john = new Child('john');
john.sayHi();
// >> Hi john!
```



## TESTS

**Install Dependencies**

```
npm install
```

**Run/View**

```
grunt test
```



## License

The MIT License (MIT) Copyright (c) 2014 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.