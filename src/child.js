/*!
 * test/child.js
 * 
 * Copyright (c) 2014
 */

define(function () {


/* -----------------------------------------------------------------------------
 * child
 * ---------------------------------------------------------------------------*/

/**
 * Inheritance for Javascript. Cleanly sets
 * inerheritance prototype chain.
 * originally adapted from: http://backbonejs.org/
 *
 * @example
 * var Parent = function (name) {
 *   this.name = name
 * }
 * 
 * var Child = child(Object, {
 *   sayHi: function () {
 *     console.log('Hi ' + this.name + '!');
 *   }
 * });
 * 
 * var john = new Child('john');
 * john.sayHi();
 * // >> Hi john!
 *
 * @public
 *
 * @param {object} Parent - Object to `inherit` prototyped methods from.
 * @param {object} child - Object containing the methods/properties to add
 *   to new objects prototype.
 *
 * @returns Child class.
 */
return function (Parent, protos) {
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

  // Mixin static props directly set on parent
  for (var i in Parent) {
    Child[i] = Parent[i];
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
  for (var j in protos) {
    Child.prototype[j] = protos[j];
  }

  // Return class yo!
  return Child;
};


});