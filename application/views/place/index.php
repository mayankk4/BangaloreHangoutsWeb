<?php $this->load->view("/elements/header") ?>

<?php $this->load->view("/elements/navbar") ?>


    <script type="text/javascript" charset="utf-8">
          $(document).ready(function(){
            
            // Pretty Photo
            $("a[rel^='prettyPhoto']").prettyPhoto();

            // do stuff here
            console.log('<?php echo $id ?>');

        });
    </script>

    <section id="news" class="single-page scrollblock">
		<img src="http://maps.googleapis.com/maps/api/staticmap
			?center=-15.800513,-47.91378&zoom=11&size=200x200&sensor=false">
	</section>

<?php $this->load->view("/elements/footer"); ?>
