<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Place extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('place_model', 'PLACE');
	}

	/**
	 * Index Page for this controller.
	 */
	public function details($id){
		// $data = array('id' => , $id);
		// $this->load->view('place/index', $data);
		// $data = $id;

		$place_data = $this->PLACE->get_place_detail($id);

		// $nearby_place_data = $this->PLACE->get_nearby_place_names($id);

		$data = array(
			'title' => 'Bangalore Hangouts! | Details',
			'id' => $id,
			'place_data' => $place_data,
			// 'nearby_places' => $nearby_places,
		);

		$this->load->view('place/index', $data);
	}

}

/* End of file place.php */
/* Location: ./application/controllers/place.php */