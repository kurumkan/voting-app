var express = require("express");
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require('morgan');

var {handle500} = require("./lib/utils");


mongoose.connect(process.env.MONGOLAB_URI);

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


//auth dependencies
var Auth = require('./auth/authentication');
var PassportServicer = require('./auth/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});


//auth routes
app.post('/signup', Auth.signup);
app.post('/signin', requireSignin, Auth.signin);

//index
app.get("/api/polls", function(request, response){		
	Poll.find({}).sort("-created").limit(15).exec(function(error, polls){
		if(error){
			handle500(response, error);
		}else{		
			
			polls = polls.map((poll)=>{				
				return {
					_id: poll._id,
					title: poll.title,
					created: poll.created,
					author: poll.author.username
				}	
			});	


			response.json({polls: polls});					
		}
	});	
});

//create (requeres authorization)
app.post("/api/polls", requireAuth, function(request, response){		

	var {title, options} = request.body;		
	
	var author = {
		id: request.user._id,
		username: request.user.username
	}

	options = options.split(/\r?\n/)
	    .filter((option)=>option.trim().length);	
	
	var formattedOptions = options.map((option)=>{
		return {
			label: option						
		}
	});

	var poll = {
		title: title,
		options: formattedOptions,
		author: author
	};	

	Poll.create(poll, function(error, newPoll){
		if(error){			
			handle500(response, error);
		}else{			
			User.findById(author.id, function(error, user){
				if(error){			
					handle500(response, error);		
				}else{					
					
					user.polls.push(newPoll);					
					user.save();					
					response.json({id: newPoll._id});					
				}
			});
			
		}
	});	
});

//show
app.get("/api/polls/:id", function(request, response){			
	Poll.findById(request.params.id, function(error, poll){		
		if(error)
			handle500(response, error);
		else{			
			response.json({poll: poll});		
		}
	});	
});

//update
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

//destroy (requires authorization)
app.delete("/api/polls/:id", requireAuth, function(request, response){		

	var id = request.params.id;			

	//check poll ownership
	Poll.findById(id, function(error, poll){
		if(error)
			handle500(error)
		else{
			//the user is the poll's author			
			if(poll.author.id.equals(request.user._id)){
				Poll.findByIdAndRemove(id, function(error){
					if(error)
						handle500(error);
					else
						response.json({id: id});				
				});								
			}else{
				response.status(403).send({error:"Only the poll's author can delete it!"});
			}
		}
	});
});

//show all the users polls (requires authorization)
app.get("/api/mypolls", requireAuth, function(request, response){

	User.findById(request.user._id)
		.populate({path: 'polls', options:{sort: {'created': -1}}})
		.exec(function(error, data){	
		if(error)handle500(error);
		else{					
			var polls = data.polls.map((poll)=>{				
				return {
					_id: poll._id,
					title: poll.title,
					created: poll.created,
					author: poll.author.username
				}	
			});			
			response.json({polls: polls})
		}
	})
});

app.get('*', function (request, response){	
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})