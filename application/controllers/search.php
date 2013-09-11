<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('place_model', 'PLACE');
		$this->load->helper('log4php', 'LOG');
	}

	/**
	 * Index Page for this controller.
	 */
	public function index(){
		// log_error('hogehoge');
		// log_info('hogehoge');
		// log_debug('hogehoge');

		$data = array(
			'title' => 'Bangalore Hangouts! | Search',
		);

		$this->load->view('search/index', $data);
	}

	/**
	 *  Ajax helper to get all place data for V.1
	 */
	public function get_all_places_v1() {
		try {
			$data = $this->PLACE->get_all_places_v1();

			 $map_id_data = array();
			foreach ($data as $value){
				$id = $value['id'];
				$map_id_data[$id] = $value;
			}
			echo json_encode($map_id_data);
		} catch(Exception $e){
			redirect('/404');
		}
	}

}

/* End of file search.php */
/* Location: ./application/controllers/search.php */