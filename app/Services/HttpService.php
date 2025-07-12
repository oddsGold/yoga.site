<?php


namespace App\Services;


use App\Contracts\Http;
use Illuminate\Http\Client\Factory;
use Illuminate\Support\Facades\Http as HttpClient;

class HttpService implements Http
{

    protected $host;
    protected $client;

    public function __construct(Factory $client)
    {
        $this->client = $client;
    }

    public function get($uri, $headers = [])
    {
        return $this->client->timeout(15)
            ->withHeaders($headers)
            //->withOptions( ['verify' => false])
            ->get($this->host . $uri);
    }

    public function post($uri, $data, $headers = [])
    {
        return $this->client->timeout(15)
            ->withHeaders($headers)
            ->asForm()
            ->post($this->host . $uri, $data);
    }
}
