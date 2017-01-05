module.exports = {	
	//handle internal errors
	handle500: function(response, error){
		console.log(error.stack);
		response.status(500);
		response.json({error: "error: internal server error"});		
	},
	getRandomColor: function() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
}