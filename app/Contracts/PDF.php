<?php


namespace App\Contracts;


interface PDF
{
    public function generateFromHtmlAndDownload($html);
}
