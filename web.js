var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('/site.js', function(req, res){
	res.send("var DOMAIN_URL='"+process.env.DOMAIN_URL+"'");
});

app.listen(process.env.PORT || 5000);