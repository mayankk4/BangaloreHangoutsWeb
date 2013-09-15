<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Place_Model extends CI_Model{

    private $place_table_name = 'place_details';
    private $nearby_places_table_name = 'nearby_places';
    private $place_type_view_name = 'place_types';

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    /////////////////////////////////// V1 APIs ////////////////////////////////////////

    // Returns all places with limited metadata sorted by distance
    function get_all_places_v1(){

        $this->db->select('id, title, rating, type, distance,
            img_url, description_full, description_full_src,
            days_reqd, visit_to_month, visit_from_month');
        $this->db->order_by("distance");

        $query = $this->db->get($this->place_table_name);

        $return = array();

        if($query->num_rows() == 0){ // no result
        }else{ // multiple rows
            $return = $query->result_array();
        }
        return $return;
    }

    function get_all_place_types() {

        $query = $this->db->get($this->place_type_view_name);

        $return = array();

        if($query->num_rows() == 0){ // no result
        }else{ // multiple rows
            $return = $query->result_array();
        }
        return $return;
    }

}


/* End of file place.php */
/* Location: ./application/models/place.php */