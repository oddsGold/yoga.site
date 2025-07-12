<?php


namespace App\Extensions;


trait Searchable
{

    public function scopeSearch($query, $text)
    {
        if($this->existsSortable()){
            $fields = $this->{$this->getPropertyName()};
            $query->where(function($query) use ($fields, $text) {
                foreach ($fields as $field){
                    $query->orWhere($field, 'like', '%'.$text.'%');
                }
            });

//            $query->whereRaw(
//                "MATCH(" . implode(',',$this->{$this->getPropertyName()}) . ") AGAINST(? IN BOOLEAN MODE)",
//                [$text .'*']
//            );
        }
        return $query;

    }

    protected function existsSortable()
    {
        return property_exists($this, $this->getPropertyName()) &&
            is_array($this->{$this->getPropertyName()}) &&
            count($this->{$this->getPropertyName()}) > 0;
    }

    protected function getPropertyName()
    {
        return 'searchable';
    }

}
