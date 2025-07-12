<?php


namespace App\Http\Response\Admin;


use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class BaseResponse implements Responsable
{

    protected $status;
    protected $data;
    protected $headers;
    protected $response;

    public function __construct($data = [], $status = 200, $headers = [])
    {
        $this->status = $status;
        $this->data = $data;
        $this->headers = $headers;
        $this->response = new JsonResponse($data, $status, $headers);
    }

    public function toResponse($request)
    {

        $this->response->setData($this->data);
        $this->response->setStatusCode($this->status);
        $this->response->withHeaders($this->headers);

        return $this->response;

    }

}
