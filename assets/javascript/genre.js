/**
 * Genre Object Constructor
 *
 * @param headerText string the text that will accompany the image/gif
 * @param gif the path to the gif in the assets directory
 * @param still the path to the still in the assets directory
 * @param dataQuery the value that will be included in the url to the player page
 */
function Genre(headerText, gif, still, dataQuery) {
	var g = {
		headerText: headerText,
		gif: gif,
		still: still,
		dataQuery: dataQuery,
	}
	return g;
}

var genres = [
	new Genre ("pop", "assets/images/pop.gif", "assets/images/pop-still.gif", "pop"),
	new Genre("rock", "assets/images/rock.gif", "assets/images/rockstill.gif", "classicrock"),
	new Genre("hip hop", "assets/images/hiphopmove.gif",  "assets/images/hiphopstill.gif", "hiphop"),
	new Genre("electronic", "assets/images/electronic.gif", "assets/images/electronicstill.gif", "electronic"),
	new Genre("jazz", "assets/images/jazz.gif", "assets/images/jazzstill.gif", "jazz"),
	new Genre("vaporwave", "assets/images/vaporwave.gif", "assets/images/vaporwave-still.gif", "vaporwave"),
	new Genre("tropical house", "assets/images/tropicalhouse.gif", "assets/images/tropicalhouse-still.gif", "tropicalhouse"),
	new Genre("bluegrass", "assets/images/bluegrass.gif", "assets/images/bluegrass-still.gif", "bluegrass"),
	new Genre("dubstep", "assets/images/dubstep.gif", "assets/images/dubstepstill.gif", "dubstep"),
	new Genre("reggae", "assets/images/reggae.gif", "assets/images/reggae_still.gif", "reggae")
];

var smallColPerRow = 2;
var smallColSize = 12 / smallColPerRow;
var mediumColPerRow = 4;
var mediumColSize = 12 / mediumColPerRow;

$(document).ready(function() {
	console.log("ready");

	// create a parent row
	var genreRow = $("<div>").addClass("row genre-row" );	
	for (var i = 0; i < genres.length; i++) {

		var genreHeading = $("<h4>").addClass("genre-heading")
		.text(genres[i].headerText);
		var genreImage = $("<div>")
			.addClass("genre-image grayscale")
			.css("background-image", "url('" + genres[i].still + "')")
            .attr('data-still', genres[i].still)
            .attr('data-animate', genres[i].gif)
            .attr('data-state', 'still');


		var genreWrapper = $("<div>").addClass("genre-wrapper");

		genreWrapper.append(genreHeading);
		genreWrapper.append(genreImage);

		var link = $("<a>").attr("href", "player.html" + "?" + "genre=" + genres[i].dataQuery);

		link.append(genreWrapper);

		var column = $("<div>")
			.addClass("column")
			.addClass("medium-" + mediumColSize)
			.addClass("small-" + smallColSize);

		column.append(link);

		genreRow.append(column);

		// Use modulus to add row to page after
		// mediumColPerRow columns
		if((i+1) % mediumColPerRow === 0) {
			// adding row to screen
			$("body").append(genreRow);
			genreRow = $("<div>").addClass("row genre-row");
		}
		else if (i === genres.length - 1) {
			// Add what we got
			var colsNeeded = 4 - (i+1) % mediumColPerRow; 
			for (var n = 0; n < colsNeeded; n++) {
				column = $("<div>")
					.addClass("column")
					.addClass("medium-" + mediumColSize)
					.addClass("small-" + smallColSize);
				genreRow.append(column);
			}
			// Adding row to screen
			$("body").append(genreRow);
		}
	};
});
	// Event listener hovering over the Gifs to create some action.
	$(document).on(
    "mouseenter", //the event to listen for
    ".genre-wrapper",//the class that we are listening on
    function() {//the action to take when mouseenter event occurs
        var imgDiv = $(this).children('.genre-image');
        imgDiv.css('background-image',"url('" + imgDiv.data('animate')+ "')");
    }
);

	$(document).on(
    "mouseleave", //the event to listen for
    ".genre-wrapper",//the class that we are listening on 
    function() {//the action to take when mouseleave event occurs
        var imgDiv = $(this).children('.genre-image');
        imgDiv.css("background-image", "url('" + imgDiv.data('still') + "')");
    }
);
      


