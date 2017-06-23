var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.locals.DOMAIN_URL = process.env.DOMAIN_URL;
console.log(process.env.DOMAIN_URL);

app.listen(process.env.PORT || 5000);