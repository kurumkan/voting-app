var React = require("react");
module.exports = (props)=>{
	return (
		<div>						
			<div className="row">	
			Bolerplate project						
				<div className="column small-centered medium-6 large-4">					
					{props.children}
				</div>
			</div>
		</div>	
	);
}
