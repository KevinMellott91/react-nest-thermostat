'use strict';

let React = require('react');

var Thermostat = React.createClass({
  circleToPath(cx, cy, r) {
    return [
      'M', cx, ',', cy,
      'm', 0 - r, ',', 0,
      'a', r, ',', r, 0, 1, ',' ,0 , r * 2, ',', 0,
      'a', r, ',', r, 0, 1, ',', 0, 0 - r * 2, ',', 0,
      'z'
    ].join(' ').replace(/\s,\s/g,',');
  },
  donutPath(cx, cy, rOuter, rInner) {
    return this.circleToPath(cx, cy, rOuter) + ' ' + this.circleToPath(cx, cy, rInner);
  },
  pointsToPath(points) {
		return points.map(function(point, iPoint) {
			return (iPoint > 0 ? 'L' : 'M') + point[0] + ' ' + point[1];
		}).join(' ') + 'Z';
	},
  rotatePoint(point, angle, origin) {
		var radians = angle * Math.PI / 180;
		var x = point[0] - origin[0];
		var y = point[1] - origin[1];
		var x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
		var y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
		return [x1, y1];
	},
  rotatePoints(points, angle, origin) {
    var _self = this;
		return points.map(function(point) {
			return _self.rotatePoint(point, angle, origin);
		});
	},
  restrictToRange(val, min, max) {
		if (val < min) return min;
		if (val > max) return max;
		return val;
	},
  getDefaultProps() {
    return {
      height: '100%',
      width: '100%',
      diameter: 400,
      numTicks: 100,
      minValue: 50,
      maxValue: 85,
      away: false,
      leaf: false,
      ambientTemperature: 74,
      targetTemperature: 68,
      hvacMode: 'off' // off, heating, cooling
    };
  },
  render() {
    // Local variables used for rendering.
    var radius = this.props.diameter / 2;
    var donutPath = this.donutPath(radius, radius, radius - 4, radius - 8);
    var ticksOuterRadius = this.props.diameter / 30;
    var ticksInnerRadius = this.props.diameter / 8;
    var tickDegrees = 300;
    var rangeValue = this.props.maxValue - this.props.minValue;

    // Determine the maximum and minimum values to display.
    var actualMinValue, actualMaxValue;
    if (this.props.away) {
      actualMinValue = this.props.ambientTemperature;
      actualMaxValue = actualMinValue;
    } else {
      actualMinValue = Math.min(this.props.ambientTemperature, this.props.targetTemperature);
      actualMaxValue = Math.max(this.props.ambientTemperature, this.props.targetTemperature);
    }
    var min = this.restrictToRange(Math.round((actualMinValue - this.props.minValue) / rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);
		var max = this.restrictToRange(Math.round((actualMaxValue - this.props.minValue) / rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);

    // Renders the degree ticks around the outside of the thermostat.
    var tickPoints = [
      [radius - 1, ticksOuterRadius],
      [radius + 1, ticksOuterRadius],
      [radius + 1, ticksInnerRadius],
      [radius - 1, ticksInnerRadius]
    ];
    var tickPointsLarge = [
      [radius - 1.5, ticksOuterRadius],
      [radius + 1.5, ticksOuterRadius],
      [radius + 1.5, ticksInnerRadius + 20],
      [radius - 1.5, ticksInnerRadius + 20]
    ];
    var theta = tickDegrees / this.props.numTicks;
    var offsetDegrees = 180 - (360 - tickDegrees) / 2;
    var tickArray = [];
    for (var iTick = 0; iTick < this.props.numTicks; iTick++) {
      var isLarge = iTick == min || iTick == max;
      var isActive = iTick >= min && iTick <= max;
      var tickElement = React.createElement('path', {
        'key': 'tick-' + iTick,
        'd': this.pointsToPath(this.rotatePoints(isLarge ? tickPointsLarge : tickPoints, iTick * theta - offsetDegrees, [radius, radius])),
        'className': isActive ? 'active' : ''
      });
      tickArray.push(tickElement);
    };

    // Determines the positioning of the leaf, should it be displayed.
    var leafScale = radius / 5 / 100;
		var leafDef = ['M', 3, 84, 'c', 24, 17, 51, 18, 73, -6, 'C', 100, 52, 100, 22, 100, 4, 'c', -13, 15, -37, 9, -70, 19, 'C', 4, 32, 0, 63, 0, 76, 'c', 6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24, 'C', 22, 63, 8, 78, 3, 84, 'z'].map(function(x) {
			return isNaN(x) ? x : x * leafScale;
		}).join(' ');
		var translate = [radius - (leafScale * 100 * 0.5), radius * 1.5];

    // Determines whether the ambient temperature label will be displayed to the left or right of the tick range.
    var lblAmbientPosition = [radius, ticksOuterRadius - (ticksOuterRadius - ticksInnerRadius) / 2];
    var peggedValue = this.restrictToRange(this.props.ambientTemperature, this.props.minValue, this.props.maxValue);
    var degs = tickDegrees * (peggedValue - this.props.minValue) / rangeValue - offsetDegrees;
    if (peggedValue > this.props.targetTemperature) {
      degs += 8;
    } else {
      degs -= 8;
    }
    var ambientPosition = this.rotatePoint(lblAmbientPosition, degs, [radius, radius]);

    // Determine if the thermostat is actively working to reach the target temperature.
    var dialState = 'off';
    if(this.props.hvacMode === 'heating') {
      dialState = 'heating';
    }
    else if(this.props.hvacMode === 'cooling') {
      dialState = 'cooling';
    }

    // Use ReactJS to create the component.
    var thermostat = React.createElement('svg', {
      'width': this.props.width,
      'height': this.props.height,
      'viewBox': '0 0 ' + this.props.diameter + ' ' + this.props.diameter,
      'className': 'dial dial--state--' + dialState + (this.props.away ? ' away' : '') + (this.props.leaf ? ' has-leaf' : '')
    },
      React.createElement('circle', {
        'cx': radius,
        'cy': radius,
        'r': radius,
        'className': 'dial__shape'
      }),
      React.createElement('path', {
        'd': donutPath,
        'className': 'dial__editableIndicator'
      }),
      React.createElement('g', {
        'className': 'dial__ticks'
      }, tickArray),
      React.createElement('text', {
        'x': radius,
        'y': radius,
        'className': 'dial__lbl dial__lbl--target'
      }, Math.round(this.props.targetTemperature)),
      React.createElement('text', {
        'x': radius + radius / 2.5,
        'y': radius - radius / 8,
        'className': 'dial__lbl dial__lbl--target--half'
      }, '5'),
      React.createElement('text', {
        'x': ambientPosition[0],
        'y': ambientPosition[1],
        'className': 'dial__lbl dial__lbl--ambient'
      }, Math.round(this.props.ambientTemperature)),
      React.createElement('text', {
        'x': radius,
        'y': radius,
        'className': 'dial__lbl dial__lbl--away'
      }, 'AWAY'),
      React.createElement('path', {
        'className': 'dial__ico__leaf'
      }),
      React.createElement('path', {
        'd': leafDef,
        'transform': 'translate(' + translate[0] + ',' + translate[1] + ')',
        'className': 'dial__ico__leaf'
      })
    );
    return thermostat;
  }
});

module.exports = Thermostat;
