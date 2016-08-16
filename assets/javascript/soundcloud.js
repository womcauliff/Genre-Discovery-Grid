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

	var filters = {
		genres: genreQuery,
		limit: 50
	};
	SC.get('tracks/', filters).then(function(tracks){
		console.log(tracks);


		var trackURL = '';
		trackURL = tracks[0].uri;
		var oembedElement = document.getElementById('oembed');
		SC.oEmbed(trackURL, {element: oembedElement}).then(function(result){
			console.log('oembed', result);
		}).catch(function(err){
			console.log('oembed err', err);
		});



		var tmp = '';
		$(tracks).each(function(index, track) {

			$('#results').append($('<li></li>').append($("<a>").attr("href", track.permalink_url).text(track.title)));
      		// $('<li></li>').html(track.title + ' - ' + track.genre));
    	});
	}).catch(function(error){
		console.log('catch', error);
	});

	// SC.get("/tracks", {
 //      genres: genreQuery,
 //      limit: 50
 //  }, function (tracks) {

 //      var tmp = '';

 //      for (var i = 0; i < tracks.length; i++) {

 //          tmp = '<a href="' + tracks[i].permalink_url + '">' + tracks[i].title + ' - ' + tracks[i].duration + '</a>';

 //          $("<li/>").html(tmp).appendTo("#track-list");
 //      }

 //  });


	 // var oembedElement = document.getElementById('oembed');
  //     SC.oEmbed('https://soundcloud.com/forss/soulhack', {element: oembedElement}).then(function(result){
  //       console.log('oembed', result);
  //     }).catch(function(err){
  //       console.log('oembed err', err);
  //     });








	// SC.get('users/forss').then(function(user){console.log('Forss', user);});
	// var track_url = 'http://soundcloud.com/forss/flickermood';
	// SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
	//   console.log('oEmbed response: ', oEmbed);
	// });
	// // stream track id 293
	// SC.stream('/tracks/293').then(function(player){
	//   player.play();
	// });

})