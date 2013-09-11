

// Total number of places
var total_places = 0;
var visible_place_ids = new Array();
var hidden_place_ids = new Array();

// Current Source of truth ~~~ (Might need to change this approach if it hogs too much memory)
// MAP --- ID -> DATA
var json_data = {};


// TODO (Mayank) : Change this to enum type
// Also need to make change in data layer
// Create ACL
var type_of_places_enum = {
	"A",
	"B",
	"C",
	"D",
	"E",
}

/////////////////////////////// Filtering functions go here ////////////////////////////////////

 // Filters available =>
 //		1. Distance from Bangalore
 //		2. Type of the place (tricky)
 //		3. Rating
 //		7. Days required

 //		8. Best to visit now ? (tricky - also allow user to enter month period - can take this up in another version)

 //		4. Road Quality
 //		5. Food availibility
 //		6. Lodge availibility


// choosing this to be a random large value initially (greated than max possible distance)
var current_distance_from_bangalore = 100000;


function on_filter_by_distance(new_distance) {

	// relax filter
	if (parseInt(new_distance) > parseInt(current_distance_from_bangalore)) {
		// go through hidden ids and maybe mark them as visible
		for (var id in hidden_place_ids) {
			if (json_data[id].distance <= new_distance) {
				show_place(id);
			}
		}
	// restrict filter 
	} else if (parseInt(new_distance) < parseInt(current_distance_from_bangalore)) {
		// go through visible ids and maybe mark them as hidden
		for (var id in visible_place_ids) {
			if (json_data[id].distance >= new_distance) {
				hide_place(id);
			}
		}
	}
}


// relaxing filter for place type
function on_filter_add_place_type(add_type_name) {
	for (var id in hidden_place_ids) {
		if (json_data[id].type === add_type_name) {
			show_place(id);
		}
	}
}

// restricting filter for place type
function on_filter_remove_place_type(remove_type_name) {
	for (var id in visible_place_ids) {
		if (json_data[id].type === remove_type_name) {
			hide_place(id);
		}
	}
}


/////////////////////////////// Helper functions ////////////////////////////////////

 function hide_place (id) {

 }

 function show_place (id) {

 }

/////////////////////////////// On Ready ////////////////////////////////////

// Load all the palces on DOM ready =>
$(document).ready(function(){

	// Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto();

	// Load all results initially onto the page
	$.ajax({
	      url: "/search/get_all_places_v1",
	      type: "GET",
	      success: function(data){
	        json_data = JSON.parse(data);

	        total_places = json_data.length;

	        var column_counter = 0;
	        var card_html = "";

	        for (var key in json_data) {
	          // console.log(key, json_data[key]);
	          var current_data = json_data[key];

	          // Initially every place is visible.
	          visible_place_ids.push(current_data.id);

	          if (column_counter == 0) {
	            card_html = card_html + "<div class='row'>";
	          }

	          // One Card
	          card_html = card_html
	              + "<article class='span4 post' id='"
	              + current_data.id
	              + "'>"
	              + "<div style='background-color:#0b333f;text-align: center;'>"
	              + "<h2 style='margin: 0 auto; color:#f0bf00; padding: 10px 0 10px 0; font-size:30px;'>"
	              + current_data.title
	              + "</h2>"
	              + "</div>"
	              + "<img class='img-news' src='/static/img/poi/bandipur.png' alt=''>"
	              + "<div class='inside'>"
	              + "<p class='post-date'><i class='icon-calendar'></i> Overall Rating : "
	              + Math.floor(current_data.rating)
	              + " / 5</p>"
	              + "<h2>"
	              + current_data.type
	              + "</h2>"
	              + "<div class='entry-content'>"
	              + "<p>"
	              + "Distance from Bangalore : "
	              + current_data.distance
	              + "</p>"
	              + "<p>"
	              + "Days Required : "
	              + current_data.days_reqd
	              + "</p>"
	              + "<a href='/place?q=1' class='more-link'>read more</a> </div>"
	              + "</div>"
	              + "</article>";

	          column_counter++;

	          if (column_counter == 3) {
	            card_html = card_html + "</div><hr>";
	            $('#filter_results_container').append(card_html);
	            column_counter = 0;
	            card_html = "";
	          }
	        }

	      }
	});
});