/*!
 * test/_umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'child/child'
], function (assert, sinon, child) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - child.js', function () {

  it('Should create child.', function () {
    var Parent = function () {};
    var Child = child(Parent, {});
    var chld = new Child();
    
    assert.isInstanceOf(chld, Parent);
  });

});


});