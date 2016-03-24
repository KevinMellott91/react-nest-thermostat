const React = require('react');
const ReactDOM = require('react-dom');
const Thermostat = require('../../src/react-nest-thermostat.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      away: false,
      ambientTemperature: 74,
      targetTemperature: 68,
      hvacMode: 'off',
      leaf: false,
    };
  }

  handleModeChange(event) {
    this.setState({ away: JSON.parse(event.target.value) });
  }

  handleHvacModeChange(event) {
    this.setState({ hvacMode: event.target.value });
  }

  handleAmbientTemperatureChange(event) {
    this.setState({ ambientTemperature: parseFloat(event.target.value) });
  }

  handleTargetTemperatureChange(event) {
    this.setState({ targetTemperature: parseFloat(event.target.value) });
  }

  handleLeafChange(event) {
    this.setState({ leaf: JSON.parse(event.target.value) });
  }

  render() {
    // Link the thermostat state to the application.
    const thermostat = React.createElement(Thermostat, {
      height: '400px',
      width: '400px',
      away: this.state.away,
      ambientTemperature: this.state.ambientTemperature,
      targetTemperature: this.state.targetTemperature,
      hvacMode: this.state.hvacMode,
      leaf: this.state.leaf,
    });

    // Setup the example application element.
    const app = React.createElement('div', {},
      React.createElement('h1', {
        className: 'cover-heading space-after',
      }, 'react-nest-thermostat'),
      thermostat,
      React.createElement('div', {
        className: 'row space-before',
      },
        React.createElement('div', {
          className: 'col-md-6',
        },
          React.createElement('div', {
            className: 'form-group',
          },
            React.createElement('label', {
              htmlFor: 'ambientTemperature',
            }, 'Ambient Temperature'),
            React.createElement('input', {
              id: 'ambientTemperature',
              type: 'range',
              defaultValue: this.state.ambientTemperature,
              min: this.props.minTemperature,
              max: this.props.maxTemperature,
              onChange: this.handleAmbientTemperatureChange.bind(this),
            })
          )
        ),
        React.createElement('div', {
          className: 'col-md-6',
        },
          React.createElement('div', {
            className: 'form-group',
          },
            React.createElement('label', {
              htmlFor: 'targetTemperature',
            }, 'Target Temperature'),
            React.createElement('input', {
              id: 'targetTemperature',
              type: 'range',
              defaultValue: this.state.targetTemperature,
              min: this.props.minTemperature,
              max: this.props.maxTemperature,
              onChange: this.handleTargetTemperatureChange.bind(this),
            })
          )
        )
      ),
      React.createElement('div', {
        className: 'row space-before',
      },
        React.createElement('div', {
          className: 'col-md-4',
        },
          React.createElement('div', {
            className: 'form-group',
          },
            React.createElement('label', {
              htmlFor: 'hvacModePicker',
            }, 'State'),
            React.createElement('select', {
              id: 'hvacModePicker',
              className: 'selectpicker',
              onChange: this.handleHvacModeChange.bind(this),
            },
              React.createElement('option', {
                value: 'off',
              }, 'Off'),
              React.createElement('option', {
                value: 'heating',
              }, 'Heating'),
              React.createElement('option', {
                value: 'cooling',
              }, 'Cooling')
            )
          )
        ),
        React.createElement('div', {
          className: 'col-md-4',
        },
          React.createElement('div', {
            className: 'form-group',
          },
            React.createElement('label', {
              htmlFor: 'modePicker',
            }, 'Away'),
            React.createElement('select', {
              id: 'modePicker',
              className: 'selectpicker',
              onChange: this.handleModeChange.bind(this),
            },
              React.createElement('option', {
                value: false,
              }, 'No'),
              React.createElement('option', {
                value: true,
              }, 'Yes')
            )
          )
        ),
        React.createElement('div', {
          className: 'col-md-4',
        },
          React.createElement('div', {
            className: 'form-group',
          },
            React.createElement('label', {
              htmlFor: 'leafPicker',
            }, 'Leaf'),
            React.createElement('select', {
              id: 'leafPicker',
              className: 'selectpicker',
              onChange: this.handleLeafChange.bind(this),
            },
              React.createElement('option', {
                value: false,
              }, 'No'),
              React.createElement('option', {
                value: true,
              }, 'Yes')
            )
          )
        )
      )
    );
    return app;
  }
}

App.propTypes = {
  /* Lowest temperature able to be displayed on the thermostat */
  minTemperature: React.PropTypes.number,
  /* Highest temperature able to be displayed on the thermostat */
  maxTemperature: React.PropTypes.number,
};

App.defaultProps = {
  minTemperature: 50,
  maxTemperature: 90,
};

// Render the application in the reserved placeholder element.
ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
