var express = require('express');
var app = express();
app.get('/api', (req, res) => res.send('Hello world') );
app.listen(4000);
console.log('http://localhost:4000.com')