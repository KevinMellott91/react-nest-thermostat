var express = require('express');
var path = require('path');
var app = express();

// Treats the "example" folder as the virtual root.
app.use(express.static('example'));

// Simply serve the example page.
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(3000, function () {
  console.log('Open browser to http://localhost:3000 to view the example.');
});
