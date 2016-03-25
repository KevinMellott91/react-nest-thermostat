'use strict';

const express = require('express');
const path = require('path');
const app = express();

// Treats the "example" folder as the virtual root.
app.use(express.static('example'));

// Simply serve the example page.
app.get('/',
  (req, res) => res.sendFile(path.join([__dirname, '/../index.html'].join('')))
);

app.listen(3000,
  /* eslint no-console: "off" */
  () => console.log('Open browser to http://localhost:3000 to view the example.')
);
