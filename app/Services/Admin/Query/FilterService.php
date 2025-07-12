<?php


namespace App\Services\Admin\Query;


class FilterService
{

    public function apply($query, $request)
    {
        $data = $request->all();
        if(count($data) > 0){
            foreach ($data as $key => $value){
                if($column = $this->getFilterableColumn($query->getModel(), $key)){
                    $query->where($column, $value);
                }
            }
        }

        return $query;
    }

    protected function getFilterableColumn($model, $column)
    {
        if(isset($model->filterable)){
            if(in_array($column, $model->filterable)){
                return $column;
            }
            if(isset($model->filterable[$column])){
                return $model->filterable[$column];
            }
        }
        return null;
    }


}
