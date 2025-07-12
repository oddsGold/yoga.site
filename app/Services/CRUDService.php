<?php


namespace App\Services;


use App\Contracts\CRUD;
use App\Services\Admin\Query\OptionsService;
use Illuminate\Support\Str;

class CRUDService implements CRUD
{

    protected string $model;
    protected OptionsService $queryOptions;


    public function __construct(OptionsService $queryOptions)
    {
        $this->queryOptions = $queryOptions;
    }

    public function getAll()
    {
        return $this->getModel()->newQuery()->get();
    }
    public function getAllWithoutPublished()
    {
        return $this->getModel()->newQuery()->first();
    }

    public function getAllWithoutPublishedAll()
    {
        return $this->getModel()->newQuery()->get();
    }

    public function getAllWithPagination()
    {
        return $this->queryOptions->apply(
            $this->getModel()->newQuery()
        );
    }

    public function getById($id)
    {
        return $this->getBy('id', $id);
    }

    public function getLast($length = 1)
    {
        return $this->getModel()->newQuery()->latest()->take($length)->get();
    }

    public function create($data)
    {
        return $this->save(new $this->model, $data);
    }

    public function update($id, $data)
    {
        return $this->save($this->getById($id), $data);
    }

    protected function save($model, $data)
    {
        $model->fill($data);
        $model->save();
        return $model;
    }

    public function delete($id)
    {
        $model = $this->getById($id);
        return $model->delete();
    }

    public function changeSortBySequence($sequence)
    {
        if(is_array($sequence) && count($sequence) > 0){
            $result = $this->getModel()
                ->newQuery()
                ->whereIn('id', $sequence)
                ->get();
            if($result && $result->count() == count($sequence)){

                $firstPosition = $result->first()->position;

                foreach($sequence as $index => $id){
                    $model = $result->where('id', $id)->first();
                    $model->position = $firstPosition;
                    $model->save();
                    $firstPosition++;
                }

            }
        }
    }

    public function findByArrayWithId($data)
    {
        return $this->getById(isset($data['id']) ? $data['id'] : null);
    }

    public function getBy($name, $value)
    {
        return $this->getModel()
            ->newQuery()
            ->where($name, $value)
            ->firstOrFail();
    }

    public function fillSlug($slug, $title, $withTimestamp = true)
    {
        return !$slug ? ($withTimestamp ? (time() . '-' . Str::slug($title)) : Str::slug($title)) : $slug;
    }

    public function getModel()
    {
        return new $this->model;
    }

}
