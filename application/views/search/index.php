

<?php $this->load->view("/elements/header") ?>

<?php $this->load->view("/elements/navbar") ?>

<?php $this->load->view("/elements/filter") ?>

<!--
  {'rating': 4, 'direction': 'Mysore +', 'lodge_rating': '7', 'road_quality': 'GOOD', 'description': '',
   'title': 'Bandipur', 'days_reqd': '2', 'best_time_to': 'Jun', 'p2_dist': ['20', '20'],
   'nearest_petrol_pump': 'Gundlupet', 'p2_ids': ['30', '31'], 'food_rating': '7', 'food_available': 'YES',
   'best_time_from': 'Oct', 'type': 'Wild life', 'lodge_available': 'YES', 'distance': '220'
  },
-->

    <!--******************** News Section ********************-->
    <section id="news" class="single-page scrollblock">
      <div class="container" id="filter_results_container">
        <!-- div class="align"><i class="icon-pencil-circled"></i></div -->
        <h1>Awesome places to visit over the weekend go here ...</h1>
        <!-- Three columns -->

<!-- FOR TESTING CARD UI (CARDS COME HERE)

         <div class="row">

          <article class="span4 post"> 
          	<div style="background-color:#0b333f;text-align: center;">
          		<h2 style="margin: 0 auto; color:#f0bf00; padding: 10px 0 10px 0; font-size:30px;">Bandipur</h2>
          	</div>
          	<img class="img-news" src="static/img/poi/bandipur.png" alt="">
            <div class="inside">
              <p class="post-date"><i class="icon-calendar"></i> Overall Rating : 4 / 5</p>
              <h2>Wildlife Sanctuary</h2>
              <div class="entry-content">
                <p>
                	Distance from Bangalore : 220kms
                </p>
                <p>
                	Days Required : 2
                </p>
                <a href="#" class="more-link">read more</a> </div>
            </div>
          </article>

        </div> 
-->

        <!--a href="#" class="btn btn-large">Go to our blog</a> </div -->

    </section>
    <hr>

    <script type="text/javascript" src="/static/js/search/search_page.js"></script>


<?php $this->load->view("/elements/footer"); ?>
