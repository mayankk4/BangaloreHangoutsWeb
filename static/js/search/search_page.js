

// Total number of places
var total_places = 0;
// var visible_place_ids = new Array();
// var hidden_place_ids = new Array();
var place_ids = new Array();

// Current Source of truth ~~~ (Might need to change this approach if it hogs too much memory)
// MAP --- ID -> DATA
var places_data = {};
// MAP --- ID -> PLACE TYPE
var place_types = new Array();

var current_filters = {};
current_filters['filter_by_current_distance_from_bangalore'] = true; // enabled default
current_filters['filter_by_place_type'] = true; // enable default
current_filters['filter_by_rating'] = true; // enable default
current_filters['filter_by_days_required'] = true; // enable default
current_filters['filter_by_best_time_to_visit'] = false; // enable default

// VARIABLES USED FOR SETTING CURRENT FILTERS
var filter_distance = 1000; // kms
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
	for (var key in place_ids) {
		var id = place_ids[key];
		if (
			//    (!current_filters['filter_by_current_distance_from_bangalore'] || (current_filters['filter_by_current_distance_from_bangalore'] && isCurrentIdAllowedByDistanceFilter(id)))
			// && (!current_filters['filter_by_place_type'] || (current_filters['filter_by_place_type'] && isCurrentIdAllowedByTypeFilter(id)))
			// && (!current_filters['filter_by_rating'] || (current_filters['filter_by_rating'] && isCurrentIdAllowedByRatingFilter(id)))
			// && (!current_filters['filter_by_days_required'] || (current_filters['filter_by_days_required'] && isCurrentIdAllowedByDaysRequiredFilter(id)))
			// && (!current_filters['filter_by_best_time_to_visit'] || (current_filters['filter_by_best_time_to_visit'] && isCurrentIdAllowedByBestTimeToVisitFilter(id)))
			isCurrentIdAllowedByDistanceFilter(id) &&
			isCurrentIdAllowedByTypeFilter(id) &&
			isCurrentIdAllowedByRatingFilter(id) &&
			isCurrentIdAllowedByDaysRequiredFilter(id) &&
			isCurrentIdAllowedByBestTimeToVisitFilter(id)
		   ) {
			show_place(id); // if all filters pass then show.
		}
	}
	updateTotalResultsDisplay();
}

// This is called whenever we restrict a filter
// This may lead to visible places becoming hidden in the UI
function filter_restricted() {
	for (var key in place_ids) {
		var id = place_ids[key];
		if (
			// either the filter is not enabled or (filter is enabled and current id is not allowed by filter)
			//    (!(current_filters['filter_by_current_distance_from_bangalore']) || (current_filters['filter_by_current_distance_from_bangalore'] && (!isCurrentIdAllowedByDistanceFilter(id))))
			// && (!(current_filters['filter_by_place_type']) || (current_filters['filter_by_place_type'] && (!isCurrentIdAllowedByTypeFilter(id))))
			// && (!(current_filters['filter_by_rating']) || (current_filters['filter_by_rating'] && (!isCurrentIdAllowedByRatingFilter(id))))
			// && (!(current_filters['filter_by_days_required']) || (current_filters['filter_by_days_required'] && (!isCurrentIdAllowedByDaysRequiredFilter(id))))
			// && (!(current_filters['filter_by_best_time_to_visit']) || (current_filters['filter_by_best_time_to_visit'] && (!isCurrentIdAllowedByBestTimeToVisitFilter(id))))
			!(isCurrentIdAllowedByDistanceFilter(id)) ||
			!(isCurrentIdAllowedByTypeFilter(id)) ||
			!(isCurrentIdAllowedByRatingFilter(id)) ||
			!(isCurrentIdAllowedByDaysRequiredFilter(id)) ||
			!(isCurrentIdAllowedByBestTimeToVisitFilter(id))
			) {
			hide_place(id); // even if one filter fails then hide.
		}
	}
	updateTotalResultsDisplay();
}

////////////////////////////// UI - H E L P E R //////////////////////////////

function updateTotalResultsDisplay() {
	var count = 0;
	for (var key in place_ids) {
		var id = place_ids[key];		
		if ($('#' + id).is(":visible")) {
			count++;
		}
	}
	$("#number-of-results").html(count);

}

//////////////////////////////////////////////////////////////////////////////


// returns boolean
function isCurrentIdAllowedByDistanceFilter(id) {
	return (filter_distance >= places_data[id].distance);
}

// returns boolean
function isCurrentIdAllowedByDaysRequiredFilter(id) {
	return (filter_days_required_max >= places_data[id].days_reqd);
}

// returns boolean
function isCurrentIdAllowedByTypeFilter(id) {
	// return true;
	// console.log(places_data[id].type);
	// console.log($.inArray(places_data[id].type, filter_place_type) >= 0);
	return ($.inArray(places_data[id].type, filter_place_type) >= 0)
}

// returns boolean
function isCurrentIdAllowedByRatingFilter(id) {
	return (filter_rating_min <= places_data[id].rating);
}

// returns boolean
function isCurrentIdAllowedByBestTimeToVisitFilter(id) {
	// Tested code
	return (
			(
				!(current_filters['filter_by_best_time_to_visit'])	
			)
		||
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
	// current_filters['filter_by_current_distance_from_bangalore'] = true;
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
	// current_filters['filter_by_place_type'] = true;
	// verify that passed filter place type is in the source of truth
	if ($.inArray(new_filter_place_type_to_add, place_types) >= 0) {
		filter_place_type.push(new_filter_place_type_to_add);
		filter_relaxed();
	}
}


// param string
// remove a place type from a list of allowed place types
// restrictive fucntion - will hide some cards
function onFilterPlaceTypeRemoveChange(new_filter_place_type_to_remove) {
	// console.log(new_filter_place_type_to_remove);
	// current_filters['filter_by_place_type'] = true;
	// verify that passed filter place type is in the source of truth
	if ($.inArray(new_filter_place_type_to_remove, place_types) >= 0) {
		// console.log(1);
		if ($.inArray(new_filter_place_type_to_remove, filter_place_type) >= 0) {
			var index = filter_place_type.indexOf(new_filter_place_type_to_remove);
			filter_place_type.splice(index, 1);
			filter_restricted();
		} else {
			// TODO : Remove this!
			alert("Error!"); // testing only
		}
	}
}

// UI HELPER FOR ABOVE 
function onPlaceTypeFilterClick (button) {
	var jbutton = $(button);

	// currently enabled and clicked to hide
	if (!jbutton.hasClass("place-filter-disabled")) {
		jbutton.addClass("place-filter-disabled"); // do not show this place type
		onFilterPlaceTypeRemoveChange(jbutton.val());
	} else {
		// already clicked so now we remove it
		jbutton.removeClass("place-filter-disabled");
		onFilterPlaceTypeAddChange(jbutton.val());
	}
}

 function onPlaceTypeAllowOrDisableAllClicked(button) {
	var jbutton = $(button);

	// currently enabled, click to hide all
	if (!jbutton.hasClass("place-filter-disabled")) {
		jbutton.addClass("place-filter-disabled");
		jbutton.val("Enable All");
		onPlaceFilterDisableAll();
	} else {
		// already clicked so now we remove it
		jbutton.removeClass("place-filter-disabled");
		jbutton.val("Disable All");
		onPlaceFilterAllowAll();
	}
 }

function onPlaceFilterAllowAll() {
	filter_place_type = place_types;
	$("#place-type-filter-options  :input").each(function(key, val){
		$(val).removeClass("place-filter-disabled");
	});
	filter_relaxed();
}

function onPlaceFilterDisableAll() {
	filter_place_type = [];
	$("#place-type-filter-options  :input").each(function(key, val){
		$(val).addClass("place-filter-disabled");
	});
	filter_restricted();
}

// param int
function onFilterRatingChange(new_filter_rating_min) {
	// current_filters['filter_by_rating'] = true;
	if (parseInt(new_filter_rating_min) < filter_rating_min) {
		filter_rating_min = parseInt(new_filter_rating_min);
		filter_relaxed();
	} else if (parseInt(new_filter_rating_min) > filter_rating_min) {
		filter_rating_min = parseInt(new_filter_rating_min);
		filter_restricted();
	}
}

// param int
function onFilterDaysRequiredMaxChange(new_filter_days_required_max) {
	// current_filters['filter_by_days_required'] = true;
	if (parseInt(new_filter_days_required_max) > filter_days_required_max) {
		filter_days_required_max = parseInt(new_filter_days_required_max);
		filter_relaxed();
	} else if (parseInt(new_filter_days_required_max) < filter_days_required_max) {
		filter_days_required_max = parseInt(new_filter_days_required_max);
		filter_restricted();
	}
}

// param boolean
// function onFilterBestTimeToVisitChange(new_filter_current_month) {
// 	// current_filters['filter_by_best_time_to_visit'] = true;
// }

////////////// FUNCTIONS TO ENABLE FILTERS /////////////////
// current_filters['filter_by_current_distance_from_bangalore'] = false;
// current_filters['filter_by_place_type'] = false;
// current_filters['filter_by_rating'] = false;
// current_filters['filter_by_days_required'] = false;
// current_filters['filter_by_best_time_to_visit'] = false;

// function onFilterDistanceEnabled() {
// 	current_filters['filter_by_current_distance_from_bangalore'] = true;
// 	filter_relaxed();
// }

// function onFilterPlaceTypeEnabled() {
// 	current_filters['filter_by_place_type'] = true;
// 	filter_relaxed();
// }

// function onFilterRatingEnabled() {
// 	current_filters['filter_by_rating'] = true;
// 	filter_relaxed();
// }

// function onFilterDaysRequiredMaxEnabled() {
// 	current_filters['filter_by_days_required'] = true;
// 	filter_relaxed();
// }

function onFilterBestTimeToVisitEnabled() {
	current_filters['filter_by_best_time_to_visit'] = true;
	filter_restricted();
}


////////////// FUNCTIONS TO DISABLE FILTERS /////////////////
// current_filters['filter_by_current_distance_from_bangalore'] = false;
// current_filters['filter_by_place_type'] = false;
// current_filters['filter_by_rating'] = false;
// current_filters['filter_by_days_required'] = false;
// current_filters['filter_by_best_time_to_visit'] = false;

// function onFilterDistanceDisabled() {
// 	current_filters['filter_by_current_distance_from_bangalore'] = false;
// 	filter_relaxed();
// }

// function onFilterPlaceTypeDisabled() {
// 	current_filters['filter_by_place_type'] = false;
// 	filter_relaxed();
// }

// function onFilterRatingDisabled() {
// 	current_filters['filter_by_rating'] = false;
// 	filter_relaxed();
// }

// function onFilterDaysRequiredMaxDisabled() {
// 	current_filters['filter_by_days_required'] = false;
// 	filter_relaxed();
// }

function onFilterBestTimeToVisitDisabled() {
	current_filters['filter_by_best_time_to_visit'] = false;
	filter_relaxed();
}


/////////////////////////////// Helper functions ////////////////////////////////////

 function hide_place (id) {
 // 	hidden_place_ids.push(id);
	// var index = visible_place_ids.indexOf(id);
	// visible_place_ids.splice(index, 1);
 	$('#' + id).hide();
 }

 function show_place (id) {
 // 	visible_place_ids.push(id);
	// var index = hidden_place_ids.indexOf(id);
	// hidden_place_ids.splice(index, 1);
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

	        for (var key in place_types) {
	        	var curr_type = place_types[key];
	        	var type_html = "<input type='button' onclick='onPlaceTypeFilterClick(this)' style='margin:4px 4px 4px 4px; padding: 4px 4px 4px 4px; background: grey; color:white;' value='" + curr_type + "'/>";
	        	$("#place-type-filter-options").append(type_html);
	        }

	        total_places = places_data.length;

	        // var column_counter = 0;
	        var card_html = "";
	        // $('#filter_results_container').append("<div class='row'>");

	        for (var key in places_data) {
	          var current_data = places_data[key];

	          // Initially every place is visible.
	          place_ids.push(current_data.id);

	          // if (column_counter == 0) {
	          //   card_html = card_html + "<div class='row'>";
	          // }

	          // One Card
	          card_html = card_html
	              + "<article class='span4 post' id='"
	              + current_data.id
	              + "' style='margin-bottom:20px;'>"
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

	          //column_counter++;

	          // if (column_counter == 3) {
	            //card_html = card_html + "</div><hr>";
	            $('#filter_results_container').append(card_html);
	            // column_counter = 0;
	            card_html = "";
	          // }
	        }
	        // $('#filter_results_container').append("</div>");
	      }
	});
});