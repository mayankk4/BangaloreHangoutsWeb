<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class About extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');

	}

	/**
	 * Index Page for this controller.
	 */
	public function index(){
		$this->load->view('about/index');
	}

	/**
	 * Team Page for this controller.
	 */
	public function team(){
		$this->load->view('about/team');
	}

	/**
	 * Contact Page for this controller.
	 */
	public function contact(){
		$this->load->view('about/contact');
	}
}

/* End of file about.php */
/* Location: ./application/controllers/about.php */