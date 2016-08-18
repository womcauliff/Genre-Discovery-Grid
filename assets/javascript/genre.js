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
	new Genre("rock", "assets/images/rock.gif", "assets/images/rockstill.gif", "classicrock"),
	new Genre("hip hop", "assets/images/hiphop.gif",  "assets/images/house.png", "hiphop"),
	new Genre("electronic", "assets/images/electronic.gif", "assets/images/house.png", "electronic"),
	new Genre("jazz", "assets/images/jazz.gif", "assets/images/house.png", "jazz"),
	new Genre("future funk", "assets/images/house.png", "assets/images/house.png", "futurefunk"),
	new Genre("vaporwave", "assets/images/house.png", "assets/images/house.png", "vaporwave")
];

var columnsPerRow = 4;
var colSize = 12 / columnsPerRow;

$(document).ready(function() {
	console.log("ready");

	// create a parent row
	var genreRow = $("<div>").addClass("row");	
	for (var i = 0; i < genres.length; i++) {

		console.log(i + genres[i]);
		//add data-state
		//add data-still
		//add data-animate

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

		var column = $("<div>").addClass("medium-" + colSize + " column");

		column.append(link);

		genreRow.append(column);

		//use mod to do action every 4th time
		if((i+1) % columnsPerRow === 0) {
			console.log("adding row to screen");
			$("body").append(genreRow);
			genreRow = $("<div>").addClass("row");
		}
	};
});

	 
      
$(document).on("mouseover", ".genre-wrapper", function() {
		console.log('mouseover');
	 	var imgDiv = $(this).children('.genre-image');
		var state = imgDiv.attr('data-state');
    	if (state == 'still') {
    		console.log('switching to Gif');
					imgDiv.css('background-image',"url('" + imgDiv.data('animate')+ "')");
                    imgDiv.attr('data-state', 'animate');

         }  else {
         	console.log('switching to still');
         			imgDiv.css("background-image", "url('" + imgDiv.data('still') + "')");
                    imgDiv.attr('data-state', 'still');
                    }

        });


	

