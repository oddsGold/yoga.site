<?php

namespace App\Extensions;

use App\Models\Scopes\CustomOrderScope;

trait Sortable
{

//    public function __construct(array $attributes = [])
//    {
//        parent::__construct($attributes = []);
//        $this->fillable[] = 'position';
//    }

    public function getLastPosition(): int|null
    {
        return $this->newQuery()
            ->max('position');
    }

    protected static function booted(): void
    {
        self::creating(function($model){
            $position = $model->getLastPosition();
            $model->position = $position ? ($position + 1) : 1;
        });

        self::deleted(function($model){

            $model->newQuery()
                ->where('position', '>', $model->position)
                ->decrement('position');

            $model->position = null;
            $model->save();

        });

        self::restored(function($model){
            $position = $model->getLastPosition();
            $model->position = $position ? ($position + 1) : 1;
            $model->save();
        });

        static::addGlobalScope(new CustomOrderScope);
    }
}
