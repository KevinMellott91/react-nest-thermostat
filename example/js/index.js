var React = require('react')
var ReactDOM = require('react-dom')
var Thermostat = require('../../src/react-nest-thermostat.js')

var App = React.createClass({
  displayName: 'App',
  getDefaultProps() {
    return {
      minTemperature: 50,
      maxTemperature: 90
    };
  },
  getInitialState() {
    return {
      away: false,
      ambientTemperature: 74,
      targetTemperature: 68,
      hvacMode: 'off'
    };
  },
  handleModeChange: function (event) {
    this.setState({away: JSON.parse(event.target.value)})
  },
  handleHvacModeChange: function (event) {
    this.setState({hvacMode: event.target.value})
  },
  handleAmbientTemperatureChange: function (event) {
    this.setState({ambientTemperature: event.target.value})
  },
  handleTargetTemperatureChange: function (event) {
    this.setState({targetTemperature: event.target.value})
  },
  render: function () {
    // Link the thermostat state to the application.
    var thermostat = React.createElement(Thermostat, {
      'height': '400px',
      'width': '400px',
      'away': this.state.away,
      'ambientTemperature': this.state.ambientTemperature,
      'targetTemperature': this.state.targetTemperature,
      'hvacMode': this.state.hvacMode
    });

    // Setup the example application element.
    var app = React.createElement('div', {},
      React.createElement('h1', {
        'className': 'cover-heading'
      }, 'react-nest-thermostat'),
      thermostat,
      React.createElement('div', {
        'styleName': 'margin-top:50px',
        'className': 'row'
      },
        React.createElement('div', {
          'className': 'col-md-6'
        },
          React.createElement('div', {
            'className': 'form-group'
          },
            React.createElement('label', {
              'htmlFor': 'ambientTemperature'
            }, 'Ambient Temperature'),
            React.createElement('input', {
              'id': 'ambientTemperature',
              'type': 'range',
              'defaultValue': this.state.ambientTemperature,
              'min': this.props.minTemperature,
              'max': this.props.maxTemperature,
              'onChange': this.handleAmbientTemperatureChange
            })
          ),
          React.createElement('div', {
            'className': 'form-group'
          },
            React.createElement('select', {
              'id': 'hvacModePicker',
              'className': 'selectpicker',
              'onChange': this.handleHvacModeChange
            },
              React.createElement('option', {
                'value': 'off'
              }, 'Off'),
              React.createElement('option', {
                'value': 'heating'
              }, 'Heating'),
              React.createElement('option', {
                'value': 'cooling'
              }, 'Cooling')
            )
          )
        ),
        React.createElement('div', {
          'className': 'col-md-6'
        },
          React.createElement('div', {
            'className': 'form-group'
          },
            React.createElement('label', {
              'htmlFor': 'targetTemperature'
            }, 'Target Temperature'),
            React.createElement('input', {
              'id': 'targetTemperature',
              'type': 'range',
              'defaultValue': this.state.targetTemperature,
              'min': this.props.minTemperature,
              'max': this.props.maxTemperature,
              'onChange': this.handleTargetTemperatureChange
            })
          ),
          React.createElement('div', {
            'className': 'form-group'
          },
            React.createElement('select', {
              'id': 'modePicker',
              'className': 'selectpicker',
              'onChange': this.handleModeChange
            },
              React.createElement('option', {
                'value': false
              }, 'Home'),
              React.createElement('option', {
                'value': true
              }, 'Away')
            )
          )
        )
      )
    );
    return app;
  }
})

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
)
