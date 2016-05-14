/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var cat = require('../models/burgers.js');

router.get('/', function(req,res) {
	res.redirect('/burger')
});

router.get('/burger', function(req,res) {
	cat.all(function(data){
		var hbsObject = {burger : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/burger/create', function(req,res) {
	cat.create(['name', 'devoured'], [req.body.name, req.body.devoured], function(data){
		res.redirect('/burger')
	});
});

router.put('/burger/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	cat.update({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/burger');
	});
});

router.delete('/burger/delete/:id', function(req,res){
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);
	cat.delete(condition, function(data){
	res.redirect('/burger')	
	});
})

module.exports = router;
