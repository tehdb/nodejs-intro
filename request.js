var https = require("https");


function getRepos(username, callback) {
	var options = {
		host : 'api.github.com',
		path : '/users/' + username + '/repos',
		method : 'GET'
	};

	var request = https.request( options, function( response){
		var body = '';
		response.on("data", function(chunk){
			body += chunk.toString('utf8');
		});
		response.on("end", function(){
			var repos = [];
			var json = JSON.parse( body );
			console.log( "Count" , json.length );
			json.forEach( function(repo){
				repos.push({
					name : repo.name,
					descr : repo.description
				});
			});

			//console.log("Repos: " , repos);
			callback(repos);
		});
	});

	request.end();
}	

getRepos("tehdb", function(repos){
	console.log("tehdb has " + repos.length + " repos");
});

getRepos("OllieParsley", function(repos){
	console.log("OllieParsley has " + repos.length + " repos");
});