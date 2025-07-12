<?php


namespace App\Services\Admin\Query;


use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SortService
{

    const QUERY_PARAM_NAME = 'sort';
    const DIRECTION_DESC_SYM = '-';

    public function apply($query, $request)
    {

        if(
            $request->has(self::QUERY_PARAM_NAME) &&
            $sort = $request->query(self::QUERY_PARAM_NAME)
        ){
            $column = $this->getColumn($sort);
            $direction = $this->getDirection($sort);
            if(
                $column &&
                $this->modelHasColumn($query,$column) &&
                $this->modelHasSortable($query->getModel(), $column)
            ){
                $query->orderBy($column, $direction);
            }
        }

        return $query;
    }

    protected function getDirection($string)
    {
        return Str::startsWith($string, self::DIRECTION_DESC_SYM) ? 'desc' : 'asc';
    }

    protected function getColumn($string)
    {
        return Str::lower(Str::after($string,self::DIRECTION_DESC_SYM));
    }

    protected function modelHasSortable($model, $column)
    {
        return isset($model->sortable) && in_array($column, $model->sortable);
    }

    protected function modelHasColumn($query, $column)
    {
        return Schema::hasColumn($query->getModel()->getTable(), $column);
    }
}
