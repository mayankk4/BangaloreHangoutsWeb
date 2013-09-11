<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');

	}

	/**
	 * Index Page for this controller.
	 */
	public function index(){
		// $this->load->view('search/index');
		redirect('/search');
	}

}

/* End of file home.php */
/* Location: ./application/controllers/home.php */