var express = require("express");
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require('morgan');

var {handle500} = require("./lib/utils");

//mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://localhost/voting-app");

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


app.get('*', function (request, response){	
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})