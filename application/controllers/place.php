<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Place extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');
	}

	/**
	 * Index Page for this controller.
	 */
	public function details($id){
		// $data = array('id' => , $id);
		// $this->load->view('place/index', $data);
		// $data = $id;

		$data = array(
			'title' => 'Bangalore Hangouts! | Details',
			'id' => $id,
		);

		$this->load->view('place/index', $data);
	}

}

/* End of file place.php */
/* Location: ./application/controllers/place.php */