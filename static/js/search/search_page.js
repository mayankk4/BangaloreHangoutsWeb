

// Total number of places
var total_places = 0;
var visible_place_ids = new Array();
var hidden_place_ids = new Array();

// Current Source of truth ~~~ (Might need to change this approach if it hogs too much memory)
// MAP --- ID -> DATA
var places_data = {};
// MAP --- ID -> PLACE TYPE
var place_types = new Array();

var current_filters = {};
current_filters['filter_by_current_distance_from_bangalore'] = true; // enabled default
current_filters['filter_by_place_type'] = false;
current_filters['filter_by_rating'] = false;
current_filters['filter_by_days_required'] = false;
current_filters['filter_by_best_time_to_visit'] = false;

// VARIABLES USED FOR SETTING CURRENT FILTERS
var filter_distance = 600; // kms
var filter_place_type = place_types; // initially everything will be selected
var filter_rating_min = 0; // means 0 and above (all) ratings to be shown initially
var filter_days_required_max = 10; // means all shown initially

var d = new Date();
var filter_current_month = d.getMonth() + 1;

// TODO -
// for place type - initialize a map and use it.
// for best time to visit now = store numbers 1 - 12 for months in backend and get them in a list

/////////////////////////////// Filtering functions go here ////////////////////////////////////

 // Filters available =>
 //		1. Distance from Bangalore
 //		2. Type of the place
 //		3. Rating
 //		4. Days required
 //		5. Best to visit now ? (tricky - also allow user to enter month period - can take this up in another version)

// This is called whenever we relax a filter
// This may lead to additional places becoming visible in the UI
function filter_relaxed() {
	for (var key in hidden_place_ids) {
		var id = hidden_place_ids[key];
		if (
			(!current_filters['filter_by_current_distance_from_bangalore'] || (current_filters['filter_by_current_distance_from_bangalore'] && isCurrentIdAllowedByDistanceFilter(id)))
			&& (!current_filters['filter_by_place_type'] || (current_filters['filter_by_place_type'] && isCurrentIdAllowedByTypeFilter(id)))
			&& (!current_filters['filter_by_rating'] || (current_filters['filter_by_rating'] && isCurrentIdAllowedByRatingFilter(id)))
			&& (!current_filters['filter_by_days_required'] || (current_filters['filter_by_days_required'] && isCurrentIdAllowedByDaysRequiredFilter(id)))
			&& (!current_filters['filter_by_best_time_to_visit'] || (current_filters['filter_by_best_time_to_visit'] && isCurrentIdAllowedByBestTimeToVisitFilter(id)))
			) {
			show_place(id);
		}
	}
}

// This is called whenever we restrict a filter
// This may lead to visible places becoming hidden in the UI
function filter_restricted() {
	for (var key in visible_place_ids) {
		var id = visible_place_ids[key];
		if (
			(!current_filters['filter_by_current_distance_from_bangalore'] || (current_filters['filter_by_current_distance_from_bangalore'] && !isCurrentIdAllowedByDistanceFilter(id)))
			&& (!current_filters['filter_by_place_type'] || (current_filters['filter_by_place_type'] && !isCurrentIdAllowedByTypeFilter(id)))
			&& (!current_filters['filter_by_rating'] || (current_filters['filter_by_rating'] && !isCurrentIdAllowedByRatingFilter(id)))
			&& (!current_filters['filter_by_days_required'] || (current_filters['filter_by_days_required'] && !isCurrentIdAllowedByDaysRequiredFilter(id)))
			&& (!current_filters['filter_by_best_time_to_visit'] || (current_filters['filter_by_best_time_to_visit'] && !isCurrentIdAllowedByBestTimeToVisitFilter(id)))
			) {
			hide_place(id);
		}
	}
}

// returns boolean
function isCurrentIdAllowedByDistanceFilter(id) {
	return (filter_distance >= places_data[id].distance);
}

// returns boolean
function isCurrentIdAllowedByTypeFilter(id) {
	return ($.inArray(places_data[id].type, filter_place_type) > 0)
}

// returns boolean
function isCurrentIdAllowedByRatingFilter(id) {
	return (filter_rating_min <= places_data[id].rating);
}

// returns boolean
function isCurrentIdAllowedByDaysRequiredFilter(id) {
	return (filter_days_required_max >= places_data[id].days_reqd);
}

// returns boolean
function isCurrentIdAllowedByBestTimeToVisitFilter(id) {
	// Tested code
	return (
			(	(places_data[id].visit_to_month >= places_data[id].visit_from_month)
			 	&& (places_data[id].visit_to_month >= filter_current_month)
			  	&& (places_data[id].visit_from_month <= filter_current_month)
			)
		||
			(	(places_data[id].visit_to_month <= places_data[id].visit_from_month)
			 	&& !((places_data[id].visit_to_month < filter_current_month)
			  		&& (places_data[id].visit_from_month > filter_current_month))
			)
		);
}

//////////////////////// HANDLING THE UI ELEMENTS FOR FILTERS //////////////////////

// var filter_distance = 10000; // kms
// var filter_place_type = new Array();
// var filter_rating_min = 0; // means 0 and above ratings to be shown
// var filter_days_required_max = 10; //
// var filter_current_month = d.getMonth();

// current_filters['filter_by_current_distance_from_bangalore'] = false;
// current_filters['filter_by_place_type'] = false;
// current_filters['filter_by_rating'] = false;
// current_filters['filter_by_days_required'] = false;
// current_filters['filter_by_best_time_to_visit'] = false;

// param int
function onFilterDistanceChange(new_filter_distance) {
	current_filters['filter_by_current_distance_from_bangalore'] = true;
	if (parseInt(new_filter_distance) > filter_distance) {
		filter_distance = parseInt(new_filter_distance);
		filter_relaxed();
	} else if (parseInt(new_filter_distance) <= filter_distance) {
		filter_distance = parseInt(new_filter_distance);
		filter_restricted();
	}
}

// param string
function onFilterPlaceTypeAddChange(new_filter_place_type_to_add) {
	current_filters['filter_by_place_type'] = true;
	// verify that passed filter place type is in the source of truth
	if ($.inArray(new_filter_place_type_to_add, place_types) > 0) {
		filter_place_type.push(new_filter_place_type_to_add);
		filter_restricted();
	}
}

// param string
function onFilterPlaceTypeRemoveChange(new_filter_place_type_to_remove) {
	current_filters['filter_by_place_type'] = true;
	// verify that passed filter place type is in the source of truth
	if ($.inArray(new_filter_place_type_to_add, place_types) > 0) {
		if ($.inArray(new_filter_place_type_to_add, filter_place_type) > 0) {
			var index = filter_place_type.indexOf(new_filter_place_type_to_add);
			filter_place_type.splice(index, 1);
			filter_relaxed();
		} else {
			// TODO : Remove this!
			alert("Error!"); // testing only
		}
	}
}

// param int
function onFilterRatingChange(new_filter_rating_min) {
	current_filters['filter_by_rating'] = true;
}

// param int
function onFilterDaysRequiredMaxChange(new_filter_days_required_max) {
	current_filters['filter_by_days_required'] = true;
	if (new_filter_days_required_max > filter_days_required_max) {
		new_filter_days_required_max = filter_days_required_max;
		filter_relaxed();
	} else if (new_filter_days_required_max < filter_days_required_max) {
		new_filter_days_required_max = filter_days_required_max;
		filter_restricted();
	}
}

// param boolean
function onFilterBestTimeToVisitChange(new_filter_current_month, isEnabled) {
	current_filters['filter_by_best_time_to_visit'] = true;
}


////////////// FUNCTIONS TO ENABLE FILTERS /////////////////
// current_filters['filter_by_current_distance_from_bangalore'] = false;
// current_filters['filter_by_place_type'] = false;
// current_filters['filter_by_rating'] = false;
// current_filters['filter_by_days_required'] = false;
// current_filters['filter_by_best_time_to_visit'] = false;

function onFilterDistanceEnabled() {
	current_filters['filter_by_current_distance_from_bangalore'] = true;
	filter_relaxed();
}

function onFilterPlaceTypeEnabled() {
	current_filters['filter_by_place_type'] = true;
	filter_relaxed();
}

function onFilterRatingEnabled() {
	current_filters['filter_by_rating'] = true;
	filter_relaxed();
}

function onFilterDaysRequiredMaxEnabled() {
	current_filters['filter_by_days_required'] = true;
	filter_relaxed();
}

function onFilterBestTimeToVisitEnabled() {
	current_filters['filter_by_best_time_to_visit'] = true;
	filter_relaxed();
}


////////////// FUNCTIONS TO DISABLE FILTERS /////////////////
// current_filters['filter_by_current_distance_from_bangalore'] = false;
// current_filters['filter_by_place_type'] = false;
// current_filters['filter_by_rating'] = false;
// current_filters['filter_by_days_required'] = false;
// current_filters['filter_by_best_time_to_visit'] = false;

function onFilterDistanceDisabled() {
	current_filters['filter_by_current_distance_from_bangalore'] = false;
	filter_relaxed();
}

function onFilterPlaceTypeDisabled() {
	current_filters['filter_by_place_type'] = false;
	filter_relaxed();
}

function onFilterRatingDisabled() {
	current_filters['filter_by_rating'] = false;
	filter_relaxed();
}

function onFilterDaysRequiredMaxDisabled() {
	current_filters['filter_by_days_required'] = false;
	filter_relaxed();
}

function onFilterBestTimeToVisitDisabled() {
	current_filters['filter_by_best_time_to_visit'] = false;
	filter_relaxed();
}


/////////////////////////////// Helper functions ////////////////////////////////////

 function hide_place (id) {
 	hidden_place_ids.push(id);
	var index = visible_place_ids.indexOf(id);
	visible_place_ids.splice(index, 1);
 	$('#' + id).hide();
 }

 function show_place (id) {
 	visible_place_ids.push(id);
	var index = hidden_place_ids.indexOf(id);
	hidden_place_ids.splice(index, 1);
 	$('#' + id).show();
 }

/////////////////////////////// On Ready ////////////////////////////////////

// Load all the palces (and place types) on DOM ready =>
// **************** Fetching the source of truth until page refresh **************** //

$(document).ready(function(){

	// Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto();

	// Load all results initially onto the page
	$.ajax({
	      url: "/search/get_all_places_v1",
	      type: "GET",
	      success: function(data){
	      	var json_data = JSON.parse(data);

	        places_data = json_data.places_map;
	        
	        for (key in json_data.place_types) {
		        place_types.push(json_data.place_types[key].type);
	        }

	        total_places = places_data.length;

	        var column_counter = 0;
	        var card_html = "";

	        for (var key in places_data) {
	          var current_data = places_data[key];

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
	              + "<a href='/place/details/" + current_data.id + "' class='more-link'>read more</a> </div>"
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