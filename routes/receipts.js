require('dotenv').config();
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');
var Receipt = require('../models/receipts');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


//let testData = [{food: 14}, {electronics: 50}, {food: 10}, {clothes: 12}, {electronics: 23}]
const testData = [ {cat: "food", total: "50"}, {cat: "electronics", total: "44"}, {cat: "food", total: "10"}, {cat: "clothes", total: "12"}, {cat: "electornics", total: "23"}];

// testing get route
router.get('/', function(req,res){
	console.log('testData', testData);
	res.json(testData)
});

router.post('/add', function(req,res){
	var token = req.body.token || req.query.token;
	
	if (!token) {
	return res.status(401).send({error: true, message: 'You Must Pass a Token!'});
	}

	// get current user from token
	jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
		if (err){
		  return res.status(500).send({ error: true, message: 'JWT Verification Error - ' + err});
		}

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();

		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		
		today = mm+'/'+dd+'/'+yyyy;

		Receipt.create({
			userId: user._id,
			total: req.body.total,
			category: req.body.category,
			createdAt: today
		}, function(err, data){
			if(err) {
				console.log('DB error', err);
				return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
			}
			//res.json(data);
			res.send("total : " + req.body.total);
		});
	})

})

// live get route return data 
// router.get('/', function(req, res){
// 	var token = req.body.token || req.query.token;
	
// 	if (!token) {
// 	return res.status(401).send({error: true, message: 'You Must Pass a Token!'});
// 	}

// 	// get current user from token
// 	jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
// 		if (err){
// 		  return res.status(500).send({ error: true, message: 'JWT Verification Error - ' + err});
// 		}

// 		Receipt.find({
// 			userId: user._id
// 		}, function(err, data){
// 			if(err) {
// 				console.log('DB error', err);
// 				return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
// 			}
// 			res.json(data)
// 		});
// 	})
// });

module.exports = router;
