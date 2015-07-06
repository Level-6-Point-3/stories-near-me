var express = require('express')
var expressStatic = require('express-static')

var app = express()

app.use(expressStatic('public'));


// app.get('/', function(req, res) {
// 	res.send('hello');
// })

app.listen(8787);