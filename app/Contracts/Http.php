<?php


namespace App\Contracts;


interface Http
{

    public function get($uri, $headers = []);

    public function post($uri, $data, $headers = []);

}
