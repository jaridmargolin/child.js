
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
  // Javascripts proto constructor makes things a
  // a pain so we are making a conscious decision
  // to use only user defined constructors!
  if (!protos.hasOwnProperty('constructor')) {
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
  // + Surogate
  //   - constructor (defined above in Child)
  //   - prototype (Parent)
  Surogate.prototype = Parent.prototype;
  // + Child
  //   + prototype (Surrogate)
  //     - constructor (Child)
  //     - prototype(Parent)
  Child.prototype = new Surrogate();
  // Want wa way to communicate with the 
  // super class using the correct context.
  Child._super = Parent.prototype;
  // Mixin protos
  for (var key in protoPros) {
    Child.prototype[key] = protoProps[key];
  }
  // Return class yo!
  return Child;
};


module.exports = kid;
