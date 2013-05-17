describe('Element', function() {
  'use strict';

  var element;

  beforeEach(function () {
    God.reincarnate();
  	element = God.get('elementa');
  });

  it('should have name elementa', function () {
  	expect(element.name()).toEqual('elementa');
  });

  it('should have level 1', function () {
  	expect(element.level()).toEqual(1);
  });

  it('should be set to level 2', function () {
  	element.level(2);
  	expect(element.level()).toEqual(2);
  });

  it('should be mixed by a and b', function () {
  	var a = God.get('a');
  	var b = God.get('b');

  	element.addFrom([a, b]);
  	expect(element.from()).toContain([a, b]);
  });

  it('should be mixed by b and a same with a and b', function () {
  	var a = God.get('a');
  	var b = God.get('b');

  	element.addFrom([a, b]);
  	element.addFrom([b, a]);

  	expect(element.from().length).toEqual(1);
  	expect(element.from()).toContain([a, b]);
  });

  it('should be from a and b', function () {
    var a = God.get('a');
    var b = God.get('b');

    element.addFrom([a, b]);
    expect(element.isFrom([a, b])).toBeTruthy();
    expect(element.isFrom([b, a])).toBeTruthy();
  });

  it('should trigger level change handler with correct value', function () {
  	var spy = jasmine.createSpy('levelChangeHandler');
  	element.onLevelChange(spy);

  	element.level(2);
  	expect(spy.calls.length).toEqual(1);
  	expect(spy).toHaveBeenCalledWith(1, 2, element);
  });

  it('should level up if source upgrade to be same or higher level than production', function () {
    var a = God.get('a');
    var b = God.get('b');

    element.addFrom([a, b]);
    expect(element.level()).toEqual(2);
    b.level(2);
    expect(element.level()).toEqual(3);
  });

  it('should keep same level if souce upgrade to be lower level than production', function () {
    var a = God.get('a');
    var b = God.get('b');
    
    element.addFrom([a, b]);
    expect(element.level()).toEqual(2);
    element.level(4);
    b.level(2);
    expect(element.level()).toEqual(4);
  });

  describe('position', function () {
    it('should be set position', function () {
      element.position({ x : 1, y : 1});
      expect(element.position()).toEqual({ x: 1, y: 1});
    });
  });

});