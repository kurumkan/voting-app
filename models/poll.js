var mongoose = require('mongoose');
var {getRandomColor} = require("../lib/utils");

var pollSchema = new mongoose.Schema({
	title: String,		
	created: {
		type: Date, default: Date.now
	},
	options: [{
		label: {type: String, default: ''},
		count: {
			type: Number,  default: 0
		},
		backgroundColor: {
			type: String,  default: '#fff'
		}
	}],
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},				
		username: String
	}
});

//before saving (presave) - create Random Colors
pollSchema.pre('save', function(next){
	var poll = this;
	
	poll.options = poll.options.map(option=>{
		option.backgroundColor = getRandomColor();
		return option;
	})	
	next();
})

var PollClass = mongoose.model('Poll', pollSchema);

module.exports = PollClass;