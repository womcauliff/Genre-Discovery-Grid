$(document).ready(function(){

	function getQueryVariable(variable)
	{
	       var query = window.location.search.substring(1);
	       console.log(query);
	       var vars = query.split("&");
	       for (var i=0; i<vars.length; i++) {
	               var pair = vars[i].split("=");
	               if(pair[0] == variable){return pair[1];}
	       }
	       return(false);
	}
	var genreQuery = getQueryVariable("genre");
	console.log(genreQuery);

	var url = "http://floating-river-39782.herokuapp.com/";
	var twitterAPIEndpoint = "1.1/search/tweets.json";
	var request = url + twitterAPIEndpoint + "?" + "q=" + genreQuery;

	$.ajax({
		method: "GET",
		url: request,
	}).done(function(response) {
		console.log(response);
	});
});