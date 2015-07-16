var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

 var myData = require('./data.json');



// Main routing
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/api', function(req, res){
res.json(myData);
});

app.get('/api/:id', function(req, res){
  console.log('Require:', req.params.id);
  res.json(myData[req.params.id]);
  });
  
app.get('/api/:id/:property', function(req, res) {
var response = {};
  response[req.params.property] = myData[req.params.id][req.params.property]
res.json(response);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
