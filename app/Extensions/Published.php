<?php


namespace App\Extensions;


trait Published
{

    public function scopePublished($query)
    {
        return $query->where('published', true)->where(function($q) {
            $q->where('published_at', '<' , now()->format("Y-m-d H:i:s"))
                ->orWhere('published_at', '=', null);
        })->where(function($q) {
            $q->where('published_to', '>' , now()->format("Y-m-d H:i:s"))
                ->orWhere('published_to', '=', null);
        });
    }
}
