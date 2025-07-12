<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class BaseResource extends JsonResource
{

    protected $fieldsToFiltrate = [];

    protected $filtrateMethod;

    public function except(...$fieldsToFiltrate)
    {
        $this->setFiltrateProps(__FUNCTION__, $fieldsToFiltrate);

        return $this;
    }

    public function only(...$fieldsToFiltrate)
    {
        $this->setFiltrateProps(__FUNCTION__, $fieldsToFiltrate);

        return $this;
    }

    public function filtrateFields($data)
    {
        if ($this->filtrateMethod) {
            $filter = $this->filtrateMethod;
            return collect($data)->{$filter}($this->fieldsToFiltrate)->toArray();
        }

        return $data;
    }

    protected function setFiltrateProps($method, $fields)
    {
        $this->filtrateMethod = $method;
        $this->fieldsToFiltrate = is_array($fields[0]) ? $fields[0] : $fields;
    }

}
