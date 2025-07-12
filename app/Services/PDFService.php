<?php


namespace App\Services;


class PDFService
{
    protected $instance = null;

    public function __construct()
    {
        if(class_exists('\Mpdf\Mpdf')){
            $this->instance = new \Mpdf\Mpdf();
        }
    }

    public function generateFromHtmlAndDownload($html = '')
    {
        if(is_array($html)){
            foreach ($html as $page){
                $this->instance->AddPage('P');
                $this->instance->WriteHTML($page);
            }
        }else{
            $this->instance->AddPage('P');
            $this->instance->WriteHTML($html);
        }
        $this->instance->Output();
    }
}
