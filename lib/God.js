'use strict';

var God = (function () {

	var World = {
		add: function (element) {
			this.library[element.name()] = element;
			if(!this.library[element.level()]) {
				this.library[element.level()] = [];
			}
			this.library[element.level()].push(element);
		},
		remove: function(element, fromLevel) {
			var level = fromLevel;
			var index = this.library[level].indexOf(element);
			this.library[level].splice(index, 1);
		},
		library: {},
		init: function() {
			var basicElements = ['Fire', 'Water', 'Air', 'Earth', 'Void'];
			this.library = {};
			for (var i = basicElements.length - 1; i >= 0; i--) {
				God.get(basicElements[i]);
			}
		}
	};

	var God = {
		mix: function(elementA, elementB) {
			return new PendingElement(elementA, elementB);
		},
		level: function (level) {
			return World.library[level] || [];
		},
		reincarnate: function() {
			World.init();
		},
		get: function (name) {
			if(!World.library[name]) {
				var newElem = new Element(name);
				World.add(newElem);
				newElem.onLevelChange(globalLevelChangeHandler);
			}
			return World.library[name];
		}
	};

	function PendingElement(a, b) {
		this._a = a;
		this._b = b;
	}

	PendingElement.prototype = {
		to: function () {
			var productions = Array.prototype.slice.call(arguments);
			for(var i = 0, len = productions.length ; i < len ; i++) {
				var production = productions[i];
				production.addFrom([this._a, this._b]);
			}
		}
	};

	function globalLevelChangeHandler(oldLevel, newLevel, element) {
		World.remove(element, oldLevel);
		World.add(element);
	}

	God.reincarnate();
	return God;
})();