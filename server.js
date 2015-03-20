// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/app')); 	// set the static files location /app/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


var router = express.Router();

var foods = [
  {id: 1, description: 'Steak', calories: 380},
  {id: 2, description: 'Candy', calories: 50},
  {id: 3, description: 'Bread', calories: 150}

];
var lastId = 4;

router.get('/food', function(req, res) {
  res.send(foods);
});
router.post('/food', function(req, res) {
  var food = req.body;
  food.id = lastId;
  lastId++;
  foods.push(food);
  res.send(food);
});


router.post('/food/:id/done', function(req, res) {
  var foodId = req.params.id;
  var food = null;
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].id == req.params.id) {
      food = foods[i];
      break;
    }
  }
  food.description = 'Done - ' + food.description;
  res.send(foods);
});

router.get('/food/:id', function(req, res) {
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].id == req.params.id) {
      res.send(foods[i]);
      break;
    }
  }
  res.send({msg: 'food not found'}, 404);
});
router.post('/food/:id', function(req, res) {
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].id == req.params.id) {
      foods[i] = req.body;
      foods[i].id = req.params.id;
      res.send(foods[i]);
      break;
    }
  }
  res.send({msg: 'food not found'}, 404);
});

router.post('/login', function(req, res) {
  console.log('API LOGIN FOR ', req.body);
  res.send({msg: 'Login successful for ' + req.body.username});
});


app.use('/api', router);



app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 			// shoutout to the user
