## React Nest Thermostat
This (unofficial) React component provides a basic display of the Nest thermostat.

### Installation
```
npm install react-nest-thermostat
```

### Demo
You can run built-in demo example via few simple steps:<br />
1. `git clone https://github.com/KevinMellott91/react-nest-thermostat.git`<br />
2. `npm install`<br />
3. `npm run-script basic-example`<br />
4. Browse to http://localhost:3000

### Component (primary) properties
- `away` (Boolean) - true/false to indicate if the Nest is in "away mode"
- `ambientTemperature` (Integer) - actual temperature detected by the Nest
- `targetTemperature` (Integer) - target temperature provided to the Nest
- `hvacMode` (String) - status of the HVAC operations
  - `off` - no action is being taken
  - `heating` - thermostat is actively heating
  - `cooling` - thermostat is actively cooling

### Inspiration
This work was inspired heavily by the [Nest Thermostat Control](http://codepen.io/dalhundal/pen/KpabZB/) Pen created by [Dal Hundal](http://codepen.io/dalhundal/).
