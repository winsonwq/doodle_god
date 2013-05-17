var Element = (function(){

	function Element(name) {
		this._name = name;
		this._level = 1;
		this._construction = [];
		this._levelChangeHandlers = [];
		this._position = { x: 0, y: 0};
	}

	Element.prototype = {
		from: function () {
			return this._construction;
		},
		position: function (position) {
			if(position) {
				this._position = position
			}else {
				return this._position;
			}
		},
		addFrom: function (source) {
			if(!this.isFrom(source)) {
				var max = Math.max(source[0].level(), source[1].level());
				var newLevel = this.level() > max ? this.level() : (max + 1);
				this.level(newLevel);
				this._construction.push(source);

				var that = this;
				source[0].onLevelChange(this._souceChangeHandler());
				source[1].onLevelChange(this._souceChangeHandler());
			}

			return this;
		},
		_souceChangeHandler: function () {
			var that = this;
			return function (oldValue, newValue, source) {
				var sources = that.from(), newLevel = 0;
				for (var i = sources.length - 1; i >= 0; i--) {
					newLevel = Math.max(newLevel, Math.max(sources[i][0].level(), sources[i][1].level()));
				}

				if(that.level() <= newLevel) {
					that.level(newLevel + 1);
				}
			};
		},
		isFrom: function (source) {
			var nameArr = findNameArr(this._construction);
			return nameArr.indexOf(source[0].name() + '+' + source[1].name()) != -1;
		},
		name: function() {
			return this._name;
		},
		level: function (level) {
			if(level) {
				var oldValue = this._level;
				this._level = level;
				if(oldValue !== level) {
					this.triggerLevelChange(oldValue, level);
				}
				return this;
			}else {
				return this._level;
			}
		},
		onLevelChange: function (func) {
			this._levelChangeHandlers.push(func);
		},
		triggerLevelChange: function (oldValue, newValue) {
			var len = this._levelChangeHandlers.length;
			for(var i = 0; i < len ; i++) {
				this._levelChangeHandlers[i].call(this, oldValue, newValue, this);
			}
		}
	};

	function findNameArr(arr) {
		var nameArr = [];
		for (var i = arr.length - 1; i >= 0; i--) {
			var construction = arr[i];
			nameArr.push(construction[0].name() + '+' + construction[1].name());
			nameArr.push(construction[1].name() + '+' + construction[0].name());
		};

		return nameArr;
	}

	return Element;

})();