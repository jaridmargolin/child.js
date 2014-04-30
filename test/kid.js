/*
 * test/kid.js:
 *
 * Copyright (c) 2014
 * MIT LICENCE
 *
 */

define([
  'proclaim',
  'sinon',
  'kid'
], function (assert, sinon, kid) {


// ----------------------------------------------------------------------------
// Reusable Vars
// ----------------------------------------------------------------------------

// The base that all classes will inherit from
var Parent = function (name) {
  this.name = name;
};

Parent.prototype.getName = function () {
  return this.name;
};

// Child test object 1
var child1 = {
  constructor: function (name) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
  },
  sayHi: function () {
    return 'Hi ' + this.name;
  }
};

// Child test object 2
var child2 = {
  sayYo: function () {
    return 'Yo ' + this.name;
  }
};


// ----------------------------------------------------------------------------
// Test
// ----------------------------------------------------------------------------

describe('kid', function () {

  it('Should uses parents constructor if method not specified in child.', function () {
    var Child2 = kid(Parent, child2),
        child  = new Child2('jarid');

    assert.equal(child.getName(), 'jarid');
  });

  it('Should use passed constructor if method specified in child.', function () {
    var Child1 = kid(Parent, child1),
        child  = new Child1('jarid');

    assert.equal(child.getName(), 'Jarid');
  });

  it('Should add methods specified in child to objects prototype.', function () {
    var Child1 = kid(Parent, child1),
        child  = new Child1('jarid');

    assert.equal(child.sayHi(), 'Hi Jarid');
  });

  it('Should establish prototype chain from inherited objects.', function () {
    var Child1 = kid(Parent, child1),
        Child3 = kid(Child1, child2),
        child  = new Child3('jarid');

    assert.equal(child.sayHi(), 'Hi Jarid');
    assert.equal(child.sayYo(), 'Yo Jarid');
  });

  it('Should pass static properties set on Parent to Child', function () {
    var Child1 = kid(Parent, child1);
    Child1.test = function () {
      assert.ok(true);
    };

    var Child3 = kid(Child1, child2),
        child  = new Child3('jarid');

    assert.ok(Child3.test);
    assert.notOk(child.test);
  });

});


});