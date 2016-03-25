const React = require('react');
const ReactDOM = require('react-dom');
const Thermostat = require('../../src/react-nest-thermostat.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    // Bind to the event handlers.
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleHvacModeChange = this.handleHvacModeChange.bind(this);
    this.handleAmbientTemperatureChange = this.handleAmbientTemperatureChange.bind(this);
    this.handleTargetTemperatureChange = this.handleTargetTemperatureChange.bind(this);
    this.handleLeafChange = this.handleLeafChange.bind(this);

    // Set the initial state.
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
    return (
      <div>
        <h1 className="cover-heading space-after">react-nest-thermostat</h1>
        <Thermostat height="400px" width="400px" away={this.state.away}
          ambientTemperature={this.state.ambientTemperature}
          targetTemperature={this.state.targetTemperature}
          hvacMode={this.state.hvacMode} leaf={this.state.leaf}
        />
        <div className="row space-before">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ambientTemperature">Ambient Temperature</label>
              <input id="ambientTemperature" type="range"
                defaultValue={this.state.ambientTemperature}
                min={this.props.minTemperature} max={this.props.maxTemperature}
                onChange={this.handleAmbientTemperatureChange}
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="targetTemperature">Target Temperature</label>
              <input id="targetTemperature" type="range"
                defaultValue={this.state.targetTemperature}
                min={this.props.minTemperature} max={this.props.maxTemperature}
                onChange={this.handleTargetTemperatureChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="row space-before">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="hvacModePicker">State</label>
              <select id="hvacModePicker" className="selectpicker"
                onChange={this.handleHvacModeChange}
              >
                <option value="off">Off</option>
                <option value="heating">Heating</option>
                <option value="cooling">Cooling</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="modePicker">Away</label>
              <select id="modePicker" className="selectpicker"
                onChange={this.handleModeChange}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="leafPicker">Leaf</label>
              <select id="leafPicker" className="selectpicker" onChange={this.handleLeafChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
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
  <App />,
  document.getElementById('app')
);
