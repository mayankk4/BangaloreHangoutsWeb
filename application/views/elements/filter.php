    <!-- ******************** HeaderWrap ********************-->
    <div id="filter-wrap">

	  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

	  <script>
	  $(function() {
	    $( "#distance-filter" ).slider({
	      value: 600,
	      min: 0,
	      max: 1000,
	      slide: function( event, ui ) {
	        $("#amount" ).html(ui.value + " kms");
	        onFilterDistanceChange(ui.value);
	      }
	    });
	    $( "#amount" ).html($("#distance-filter").slider( "value" ) + " kms");
	  });
	  </script>

	<div id="days-filter" style="padding:30px 10px 10px 30px;">
		<p style="width:20%;color:white;display:inline;">Max. Distance from Bangalore &nbsp;&nbsp;&nbsp;&nbsp;</p>
		<p id="amount" style="width:20%;display:inline;color:white;"></p>
		<div id="distance-filter" style="width:30%;margin-top:3px;"></div>
	</div>

		<br/>
		<br/>
    </div>
