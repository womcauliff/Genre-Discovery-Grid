/**
 * Genre Object Constructor
 */
function Genre(headerText, img, dataQuery) {
	var g = {
		headerText: headerText,
		img: img,
		dataQuery: dataQuery,
	}
	return g;
}

var genres = [
	new Genre("rock", "assets/images/house.png", "classicrock"),
	new Genre("hip hop", "assets/images/house.png", "hiphop"),
	new Genre("electronic", "assets/images/house.png", "electronic"),
	new Genre("jazz", "assets/images/house.png", "jazz"),
];

var columnsPerRow = 4;
var colSize = 12 / columnsPerRow;

$(document).ready(function() {
	console.log("ready");

	// create a parent row
	var genreRow = $("<div>").addClass("row");	
	for (var i = 0; i < genres.length; i++) {

		console.log(i + genres[i]);


		var genreHeading = $("<h4>").addClass("genre-heading").text(genres[i].headerText);
		var genreImage = $("<div>").addClass("genre-image grayscale").css("background-image", "url('assets/images/house.png')");

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