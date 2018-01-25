var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var receiptSchema = new mongoose.Schema({
	userId: {
		type: String,
    	required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		required: true
	}
});


var Receipts = mongoose.model('Receipts', receiptSchema);

module.exports = Receipts;