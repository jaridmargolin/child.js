;(function () {


/*!
 * kid.js:
 *
 * Copyright (c) 2014
 * MIT LICENCE
 *
 * Originally adapted from: http://backbonejs.org/
 */
var kid = function (Parent, protos) {
  // Our new baby :D
  var Child;
  // Child can set constructor by passing in with
  // protos.
  if (protos.hasOwnProperty('constructor')) {
    Child = protos.constructor;
  } else {
    Child = function () {
      return Parent.apply(this, arguments);
    };
  }
  // Function used to set up correct
  // prototype chain
  var Surrogate = function () {
    this.constructor = Child;
  };
  // + Surrogate
  //   - constructor (defined above in Child)
  //   - prototype (Parent)
  Surrogate.prototype = Parent.prototype;
  // + Child
  //   + prototype (Surrogate)
  //     - prototype(Parent)
  Child.prototype = new Surrogate();
  // Mixin protos
  for (var key in protos) {
    Child.prototype[key] = protos[key];
  }
  // Return class yo!
  return Child;
};



this['kid'] = kid;




}());