require('dotenv').config();
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');
var Receipt = require('../models/receipts');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



// post route return data 
router.get('/', function(req, res){
	var token = req.body.token || req.query.token;
	
	if (!token) {
	return res.status(401).send({error: true, message: 'You Must Pass a Token!'});
	}

	// get current user from token
	jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
		if (err){
		  return res.status(500).send({ error: true, message: 'JWT Verification Error - ' + err});
		}

		Receipt.find({
			userId: user._id
		}, function(err, data){
			if(err) {
				console.log('DB error', err);
				return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
			}
			res.json(data)
		});
	})
});

module.exports = router;
