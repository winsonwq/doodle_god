describe('God', function() {
  'use strict';

  beforeEach(function () {
    God.reincarnate();
  });

  describe('init', function () {
    it('should init 5 basic elements', function () {
      expect(God.level(1).length).toEqual(5);
      expect(God.level(1)).toContain(God.get('Fire'));
      expect(God.level(1)).toContain(God.get('Water'));
      expect(God.level(1)).toContain(God.get('Air'));
      expect(God.level(1)).toContain(God.get('Earth'));
      expect(God.level(1)).toContain(God.get('Void'));
    });
  });

  describe('get', function () {
    it('should create one if the element dones\'t exist', function () {
      var element = God.get('NewElement');
      expect(element).not.toBeUndefined();
    });
  });

  describe('mix/to', function () {

    it('should mix fire and water to alcohol', function() {
      var fire = God.get('Fire');
      var water = God.get('Water');
      var alcohol = God.get('alcohol');

      God.mix(fire, water).to(alcohol);
      expect(alcohol.from()).toContain([fire, water]);
    });

    it('should mix bacteria and swamp to sulfur and worm', function () {
      var bacteria = God.get('bacteria');
      var swamp = God.get('swamp');
      var sulfur = God.get('sulfur');
      var worm = God.get('worm');

      God.mix(bacteria, swamp).to(sulfur, worm);
      expect(sulfur.from()).toContain([bacteria, swamp]);
      expect(worm.from()).toContain([bacteria, swamp]);
    });

    it('should mix fire and air to energy, ghost and philosophers stone to energy as well', function () {
      var fire = God.get('Fire');
      var air = God.get('Air');
      var energy = God.get('energy');
      var ghost = God.get('ghost');    
      var philosophers_stone = God.get('philosophers_stone');

      God.mix(fire, air).to(energy);
      God.mix(ghost, philosophers_stone).to(energy);

      expect(energy.from()).toContain([fire, air]);
      expect(energy.from()).toContain([ghost, philosophers_stone]);
    });
  });

  describe('level', function () {
    it('should set alcohol to level 2 mixing fire and water', function () {
      var fire = God.get('Fire');
      var water = God.get('Water');
      var alcohol = God.get('alcohol');

      God.mix(fire, water).to(alcohol);      
      expect(alcohol.level()).toEqual(2);
      expect(God.level(2)).toContain(alcohol);
    });

    it('should upgrade level', function () {
      var fire = God.get('Fire');
      var alcohol = God.get('alcohol');
      var energy = God.get('energy');
      alcohol.level(2);
      God.mix(fire, alcohol).to(energy);

      expect(energy.level()).toEqual(3);
      expect(God.level(3)).toContain(energy);
    });

    it('should upgrade level if source is higher', function () {
      var fire = God.get('Fire');
      var air = God.get('Air');
      var energy = God.get('energy');
      var alcohol = God.get('alcohol');
      alcohol.level(2);

      God.mix(fire, air).to(energy); // 2
      God.mix(fire, alcohol).to(energy); // 3

      expect(energy.level()).toEqual(3);
      expect(God.level(3)).toContain(energy);
      expect(God.level(2)).not.toContain(energy);
    });

    it('should keep level if source is lower', function () {
      var fire = God.get('Fire');
      var air = God.get('Air');
      var energy = God.get('energy');
      var alcohol = God.get('alcohol');
      alcohol.level(2);

      God.mix(fire, alcohol).to(energy);
      God.mix(fire, air).to(energy);

      expect(energy.level()).toEqual(3);
      expect(God.level(3)).toContain(energy);
      expect(God.level(2)).not.toContain(energy);
    });

    it('should upgrade once source level upgrade', function () {
      var fire = God.get('Fire');
      var air = God.get('Air');
      var energy = God.get('energy');

      God.mix(fire, air).to(energy); // level 2
      expect(energy.level()).toEqual(2);

      air.level(air.level() + 1);
      expect(energy.level()).toEqual(3);
    });

    it('should upgrade level product when source level upgraded', function () {
      var blood = God.get('Blood');
      var human = God.get('Human');
      var vampire = God.get('Vampire');

      God.mix(blood, human).to(vampire);
      blood.level(3);
      expect(vampire.level()).toEqual(4);
      expect(God.level(4)).toContain(vampire);
    })
  });
});