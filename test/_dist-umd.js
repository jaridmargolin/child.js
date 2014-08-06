/*!
 * test/_dist-umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'kid'
], function (assert, sinon, kid) {


// ----------------------------------------------------------------------------
// Test
// ----------------------------------------------------------------------------

describe('umd - emitter.js', function () {

  it('Should create child.', function () {
    var Parent = function () {};
    var Child = kid(Parent, {});
    var child = new Child();
    
    assert.isInstanceOf(child, Parent);
  });

});


});