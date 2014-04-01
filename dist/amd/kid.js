define([], function () {


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
  // Javascripts constructor makes things a pain
  // so we are making a conscious decision
  // to use only user defined constructors!
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
  //     - constructor (Child)
  //     - prototype(Parent)
  Child.prototype = new Surrogate();
  // Want wa way to communicate with the 
  // super class using the correct context.
  Child.prototype.super = function (name, args) {
    Parent.prototype[name].apply(this, args);
  };
  // Mixin protos
  for (var key in protos) {
    Child.prototype[key] = protos[key];
  }
  // Return class yo!
  return Child;
};


return kid;



});