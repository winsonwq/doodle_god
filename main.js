window.onload = function () {
	$.getJSON('/formulae.json?' + Date.now(), function (formulae) {
		$.each(formulae, function (idx, formula) {
			var from = [];
			$(formula.from).each(function (i, name) {
				from.push(God.get(name));
			});

			var to = [];
			$(formula.to).each(function (j, name) {
				to.push(God.get(name));
			});

			var penddingElement = God.mix.apply(God, from);
			penddingElement.to.apply(penddingElement, to);
		});
		drawWorld();
	});

	function drawWorld() {
		var world = d3.selectAll('#world').append('svg:svg');
		var width = '100%', height = 1300, elementRadius = 10;
		var lineColors = ['purple', '#37a5af', '#ed9877', '#5e5a79'];

		world.attr('width', width)
	  	.attr('height', height);
	  
	  var lines = world.append('svg:g');
		var elements = world.append('svg:g');

		for(var i = 1; God.level(i).length != 0 ; i++ ){
			var elems = God.level(i);
			var margin = height / (elems.length + 1);
			var x = 75 * i;

			$(elems).each(function (idx, elem) {
				var element = elements.append('svg:g');
				var y = (idx + 1) * margin;
				y += i % 2 * 30;

				elem.position({
					x: x,
					y: y
				});

			  element.attr('transform', 'translate(' + x + ', ' + y + ')')
						.append('svg:circle')
							.attr('class', 'node')
							.attr('r', elementRadius)
							.on('mouseover', function () {
								d3.select(this).transition().attr('r', elementRadius + 5).duration(1000).ease("elastic", 2);
								$(elem.from()).each(function (idx) {
									d3.selectAll('[class~="' + elem.name().replace(/\s/g, '-') + '-' + idx + '"]')
										.transition()
										.style('stroke-width', '5px')
										.style('stroke', lineColors[idx]);
								});
							})
							.on('mouseout', function () {
								d3.select(this).transition().attr('r', elementRadius).ease("elastic");
								$(elem.from()).each(function (idx) {
									d3.selectAll('[class~="' + elem.name().replace(/\s/g, '-') + '-' + idx + '"]')
										.transition()
										.style('stroke-width', '2px')
										.style('stroke', '#ddd');
								});
							});

				element.append('svg:text')
					.attr('class', 'element-name')
					.text(elem.name())
					.attr('x', 0)
			    .attr('y', -20);

			  $(elem.from()).each(function (fromIndex, sources) {
			  	$(sources).each(function (sourceIndex, source) {
			  		var sourcePosition = source.position();
			  		var elemPosition = elem.position();

			  		var qPositionX = sourcePosition.x + (elemPosition.x - sourcePosition.x) / 2;
			  		var qPositionY = sourcePosition.y + (elemPosition.y - sourcePosition.y) / 2;

			  		var path = 'M' + sourcePosition.x + ',' + sourcePosition.y + ' ';
			  		path += 'L' + elemPosition.x + ',' + elemPosition.y ;

			  		lines.append('svg:path')
				  		.attr('class', 'link' + ' ' + elem.name().replace(/\s/g, '-') + '-' + fromIndex)
				  		.attr('id', 'path')
					    .attr('d', path);
			  	});
			  });
			});
		}
	}
};
