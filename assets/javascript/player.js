var genreQuery = "";
var loadedTrack = {};

$(document).ready(function(){
	//parse url for the genre query, add to global var
	genreQuery = getQueryVariable("genre");
	console.log(genreQuery);
	$("#genre").text("#"+genreQuery);

	//on load, display Soundcloud results first, rather than Twitter
	displaySCResults(genreQuery);
});

/**
 * From CSS-Tricks
 * https://css-tricks.com/snippets/javascript/get-url-variables/
 */
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){
			return pair[1];
		}
	}
	return(false);
}

/**
 * displaySCResults()
 * Using the Soundcloud SDK,
 * makes requests to the tracks/ endpoint.
 */
function displaySCResults(query) {
	console.log("displaySCResults()");
	SC.initialize({
	  client_id: 'a5300cfa6885a74bd314b43a1ae6d526'
	});

	var filters = {
		genres: query,
		limit: 50
	};

	SC.get('tracks/', filters).then(function(tracks){
		console.log(tracks);

		$("#results").empty();

		var trackURL = '';
		trackURL = tracks[0].uri;

		//Auto-load first track from results
		var oembedElement = document.getElementById('oembed');
		SC.oEmbed(trackURL, {element: oembedElement})
		.catch(function(err){
			console.log('oembed err', err);
		});

		var ol = $('<ol>');
		$(tracks).each(function(index, track) {


			var trackArt = $("<div>")
				.addClass("track-art");
			
			if(track.artwork_url !== null) {
				trackArt.css("background-image", "url('" + track.artwork_url + "')");
			}
			else {
				trackArt.css("background-image", "url('" + track.user.avatar_url + "')");
			}
				
			var trackTitle = $("<p>")
				.addClass("track-title")
				.html(track.title);

			var trackDiv = $("<div>")
				.addClass("trackResult")
				.attr("data-uri", track.uri)
				.append(trackArt)
				.append(trackTitle);
			ol.append($('<li>').addClass("result").append(trackDiv));
      		// $('<li></li>').html(track.title + ' - ' + track.genre));
    	});
		$('#results').append(ol);
	}).catch(function(error){
		console.log('catch', error);
	});
}

/**
 * displayTWResults()
 * Using the Twitter 1.1 API,
 * makes calls to Mooch app, hosted on heroku server.
 */
function displayTWResults(query) {
	console.log("displayTWResults()");

	$("#results").empty();
	
	var moochURL = "https://floating-river-39782.herokuapp.com/";
	var twitAPIEndpoint = "1.1/search/tweets.json";
	var hashtag = "%23" + genreQuery;
	var request = moochURL + twitAPIEndpoint + "?" + "q=" + hashtag;

	$.ajax({
		dataType: 'jsonp',
		url: request,
	}).done(function(response) {
		console.log(response);

		var ol = $('<ol>');
		$(response.statuses).each(function(index, status) {
			console.log(status.user.profile_image_url_https);
			var tweetLink = $("<a>")
				.attr("target", "_blank")
				.attr("href", "https://www.twitter.com/" + status.user.id + "/status/" + status.id_str)
				.addClass("tweet-link");

			var tweetPic = $("<div>")
				.addClass("tweet-pic")
				.css("background-image", "url('" + status.user.profile_image_url_https + "')");
				
			var tweetText = $("<p>")
				.addClass("tweet-text")
				.html(status.text);

			var tweetDiv = $("<div>")
				.addClass("tweetResult")
				.append(tweetLink)
				.append(tweetPic)
				.append(tweetText);
			ol.append($('<li>').addClass("result").append(tweetDiv));
		});
		$('#results').append(ol);
	});
}

/**
 * Binds the API call functions to the UI buttons
 */
$("#querySoundcloud").on("click", function() {
	console.log("soundcloud button clicked");
	displaySCResults(genreQuery);
});
$("#queryTwitter").on("click", function() {
	console.log("twitter button clicked");
	displayTWResults(genreQuery);
});

/**
 * On click, changes the track played by the Soundcloud Embedded Player
 */
$(document).on("click", ".trackResult", function() {
	console.log("Clicked! " + $(this).text());

	//deleting old embed player
	$("oembed").empty();

	//creating new embed player, add to DOM
	var oembedElement = document.getElementById('oembed');
	SC.oEmbed($(this).data("uri"), {element: oembedElement}).then(function(result){
		console.log('oembed', result);
	}).catch(function(err){
		console.log('oembed err', err);
	});
});