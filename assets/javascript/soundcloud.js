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

	$("#genre").text(genreQuery);

	SC.initialize({
	  client_id: 'a5300cfa6885a74bd314b43a1ae6d526'
	});
	SC.get('users/forss').then(function(user){console.log('Forss', user);});
	// // stream track id 293
	// SC.stream('/tracks/293').then(function(player){
	//   player.play();
	// });

})