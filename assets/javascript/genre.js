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
	new Genre("hip hop", "assets/images/hiphopmove.gif",  "assets/images/hiphopstill.gif", "hiphop"),
	new Genre("electronic", "assets/images/electronic.gif", "assets/images/electronicstill.gif", "electronic"),
	new Genre("jazz", "assets/images/jazz.gif", "assets/images/jazzstill.gif", "jazz"),
	new Genre("future funk", "assets/images/house.png", "assets/images/house.png", "futurefunk"),
	new Genre("vaporwave", "assets/images/house.png", "assets/images/house.png", "vaporwave")
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

		var column = $("<div>")
			.addClass("column")
			.addClass("medium-" + mediumColSize)
			.addClass("small-" + smallColSize);

		column.append(link);

		genreRow.append(column);

		//use mod to do action every 4th time
		if((i+1) % mediumColPerRow === 0) {
			console.log("adding row to screen");
			$("body").append(genreRow);
			genreRow = $("<div>").addClass("row genre-row");
		}
	};
});

	$(document).on(
    "mouseenter", //the event to listen for
    ".genre-wrapper",//the class that we are listening on
    function() {//the action to take when mouseenter event occurs
        var imgDiv = $(this).children('.genre-image');
        console.log('switching to Gif');
        imgDiv.css('background-image',"url('" + imgDiv.data('animate')+ "')");
    }
);

	$(document).on(
    "mouseleave", //the event to listen for
    ".genre-wrapper",//the class that we are listening on 
    function() {//the action to take when mouseleave event occurs
        var imgDiv = $(this).children('.genre-image');
        console.log('switching to still');
        imgDiv.css("background-image", "url('" + imgDiv.data('still') + "')");
    }
);
      
// $(document).hover("mouseover", ".genre-wrapper", function() {
// 		console.log('mouseover');
// 	 	var imgDiv = $(this).children('.genre-image');
// 		var state = imgDiv.attr('data-state');
//     	if (state == 'still') {
//     		console.log('switching to Gif');
// 					imgDiv.css('background-image',"url('" + imgDiv.data('animate')+ "')");
//                     imgDiv.attr('data-state', 'animate');

//          }  else {
//          	console.log('switching to still');
//          			imgDiv.css("background-image", "url('" + imgDiv.data('still') + "')");
//                     imgDiv.attr('data-state', 'still');
//                     }

//         });


	

