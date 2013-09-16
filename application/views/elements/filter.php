
<!-- ******************** Filters ********************-->
<div id="filter-wrap">

	  <p style="margin-left:20px;color:#f0bf00;padding-top:10px;font-size:25px; margin-bottom:5px;"> Tell us about your plans !</p>
	  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

	  <script>
	  $(function() {
	    $( "#tabs" ).tabs();
	  });
	  </script>
 
	  <script>
		$(function() {
		    $( "#distance-filter" ).slider({
		      value: 500,
		      min: 0,
		      max: 1000,
		      step: 50,
		      slide: function( event, ui ) {
		      $("#distance-value").html(ui.value + " kms");
		      onFilterDistanceChange(ui.value);
		    }
		  });
		  $("#distance-value").html($("#distance-filter").slider( "value" ) + " kms");
		});
	 </script>

	  <script>
		  $(function() {
		    $("#days-filter").slider({
		      value: 5,
		      min: 0,
		      max: 6,
      	      step: 1,
		      slide: function( event, ui ) {
		        $("#days-value" ).html(ui.value);
		        onFilterDaysRequiredMaxChange(ui.value);
		      }
		    });
		    $("#days-value").html($("#days-filter").slider("value"));
		  });
	  </script>

	<script>
	  $(function() {
	    $("#best-time-filter")
	    	.button()
	    	.click(function() {
	    		if ($('#label-for-best-time-filter').hasClass('best-time-filter-enabled')) {
					$('#label-for-best-time-filter').removeClass('best-time-filter-enabled');
	    			onFilterBestTimeToVisitDisabled();
	    		} else {
	    			$('#label-for-best-time-filter').addClass('best-time-filter-enabled');
					onFilterBestTimeToVisitEnabled();
	    		}
	      	});
      });
	</script>

	  <script>
		$(function() {
		    $( "#rating-filter" ).slider({
		      value: 1,
		      min: 1,
		      max: 5,
		      step: 1,
		      slide: function( event, ui ) {
		      $("#rating-value").html(ui.value);
		      onFilterRatingChange(ui.value);
		    }
		  });
		  $("#rating-value").html($("#rating-filter").slider( "value" ));
		});
	 </script>


	<div id="tabs" style="margin-left:20px;margin-right:20px; padding-bottom:20px;">
	  <ul style="background:white;border:0px;border-bottom:1px solid #aaaaaa;">
	    <li><a href="#tabs-1">How Far ?</a></li>
	    <li><a href="#tabs-2">How Long ?</a></li>
	    <li><a href="#tabs-3">Best Time ?</a></li>
	    <li><a href="#tabs-4">Ratings ?</a></li>
	    <li><a href="#tabs-5">Type of place ?</a></li>
	  </ul>

	  <!-- DISTANCE FILTER -->
	  <div id="tabs-1">
		<div id="distance-filter-wrapper" style="padding:30px 10px 10px 30px;">
			<p style="width:20%;;display:inline;">Maximum Distance from Bangalore &nbsp;&nbsp;&nbsp;&nbsp;</p>
			<p id="distance-value" style="width:20%;display:inline;"></p>
			<div id="distance-filter" style="width:30%;margin-top:3px;"></div>
		</div>
	  </div>

	<!-- DAYS REQUIRED FILTER -->
	  <div id="tabs-2">
		<div id="days-filter-wrapper" style="padding:30px 10px 10px 30px;">
			<p style="width:20%;display:inline;">Maximum Days Required &nbsp;&nbsp;&nbsp;&nbsp;</p>
			<p id="days-value" style="width:20%;display:inline;"></p>
			<div id="days-filter" style="width:30%;margin-top:3px;"></div>
		</div>
	  </div>

	<!-- FILTER BY BEST TIME TO VISIT -->
	  <div id="tabs-3">
		<div id="best-time-to-visit-filter-wrapper" style="padding:30px 10px 10px 30px;">
			<br/>
			<input type="checkbox" id="best-time-filter" style="margin:0 0 0 0;display:none;" />
			<label for="best-time-filter" id="label-for-best-time-filter" style="width:20%;display:inline;font-size:18px;">Show only places best to visit in <?php echo date('F'); ?></label>
		</div>
	  </div>

	<!-- FILTER BY RATING -->
	  <div id="tabs-4">
		<div id="rating-filter-wrapper" style="padding:30px 10px 10px 30px;">
			<p style="width:20%;display:inline;">Minimum Rating &nbsp;&nbsp;&nbsp;&nbsp;</p>
			<p id="rating-value" style="width:20%;display:inline;"></p>
			<div id="rating-filter" style="width:30%;margin-top:3px;"></div>
		</div>
	  </div>

	<!-- FILTER BY TYPE OF PLACE -->
	  <div id="tabs-5">
		<div id="place-type-filter-wrapper" style="padding:30px 10px 10px 30px;">
<!-- 			<p style="width:20%;display:inline;">Filter by Type &nbsp;&nbsp;&nbsp;&nbsp;</p> -->
			<input type="button" onclick="onPlaceTypeAllowOrDisableAllClicked(this)" style="margin:4px 4px 4px 4px; padding: 4px 4px 4px 4px; background: grey; color:white;" value="Disable All">

			<div id="place-type-filter-options">
			</div>
		</div>
	  </div>

	</div>

</div>












