<?php $this->load->view("/elements/header") ?>

<?php $this->load->view("/elements/navbar") ?>


    <script type="text/javascript" charset="utf-8">
          $(document).ready(function(){
            
            // Pretty Photo
            // $("a[rel^='prettyPhoto']").prettyPhoto();

            // do stuff here
            // console.log('<?php echo $id ?>');
                // $.ajax({
                //   url: "/place/get_all_places_v1",
                //   type: "GET",
                //   success: function(data){
                //     var json_data = JSON.parse(data);

        });
    </script>

    <section id="news" class="single-page scrollblock" style="margin-left:50px;">

        <?php print_r($place_data[0]) ?>

	</section>

<?php $this->load->view("/elements/footer"); ?>
