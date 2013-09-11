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

<?php $this->load->view("/elements/footer"); ?>
