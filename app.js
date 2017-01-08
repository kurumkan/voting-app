var express = require("express");
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require('morgan');

//auth dependencies
var Auth = require('./auth/authentication');
var PassportServicer = require('./auth/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

var {handle500} = require("./lib/utils");

//mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://localhost/voting-app");

var Poll = require('./models/poll');
var User = require('./models/user');


app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({type:'*/*'}));


Poll.remove({}, function(err, data){
	if(err){
		console.log('error', err)
	}else{
		console.log('ok')
	}
});

Poll.create({
	title: 'Dogs',
	options: [
		{label: 'Husky', count: 4, backgroundColor: 'red'},
		{label: 'Bulldog', count: 1, backgroundColor: 'green'},
		{label: 'Bankhar', count: 5,backgroundColor: 'blue' }
	]	
}, function(err, data){
	if(err){
		console.log('error', err)
	}else{
		console.log('ok')
	}		
});	

Poll.create({
	title: 'Cities',
	options: [
		{label: 'New York', count: 23, backgroundColor: 'orange'},
		{label: 'Chicago', count: 12, backgroundColor: 'yellow'},
		{label: 'Berlin', count: 33,backgroundColor: 'brown' }
	]	
}, function(err, data){
	if(err){
		console.log('error', err)
	}else{
		console.log('ok')
	}		
});	

//auth routes
app.post('/signin', requireSignin, Auth.signin);
app.post('/signup', Auth.signup);

//OK
app.get("/api/polls", function(request, response){		
	Poll.find({}).sort("-created").limit(15).exec(function(error, polls){
		if(error){
			handle500(response, error);
		}else{							
			response.json({polls: polls});					
		}
	});	
});

//require auth
app.post("/api/polls", function(request, response){		

	var {title, options} = request.body;		

	options = options.split(/\r?\n/)
	    .filter((option)=>option.trim().length);	
	
	var formattedOptions = options.map((option)=>{
		return {
			label: option						
		}
	});

	var poll = {
		title: title,
		options: formattedOptions
	};	

	Poll.create(poll, function(error, newPoll){
		if(error){			
			handle500(response, error);
		}else{		
			response.json({id: newPoll._id});						
		}
	});	
});

//OK
app.get("/api/polls/:id", function(request, response){			
	Poll.findById(request.params.id, function(error, poll){		
		if(error)
			handle500(response, error);
		else{			
			response.json({poll: poll});		
		}
	});	
});

//require auth
app.put("/api/polls/:id",function(request, response){		
	var id = request.params.id;		
	var {title, options} = request.body;
	
	var updatedPoll = {
		title: title,
		options: options
	};

	Poll.findByIdAndUpdate(id, updatedPoll, function(error, poll){
		if(error)
			handle500(error);
		else{			
			response.json({id: poll._id});				
		}
	});
});

//requires auth
app.delete("/api/polls/:id", function(request, response){		
	var id = request.params.id;			

	Poll.findByIdAndRemove(id, function(error){
		if(error)
			handle500(error);
		else
			response.json({id: id});				
	});
});


app.get("/api/mypolls", function(request, response){

	User.findById(request.user._id).populate('polls').exec(function(error, data){
		if(error)handle500(error);
		else{			
			response.json({polls: data.polls})
		}
	})
});

app.get("/api/mypolls", function(request, response){		
	Poll.find({author: {id: request.user._id}}).sort("-created").exec(function(error, polls){
		if(error){
			handle500(response, error);
		}else{							
			response.json({polls: polls});		
		}
	});	
});


app.get('*', function (request, response){	
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})