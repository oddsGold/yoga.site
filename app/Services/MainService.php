<?php


namespace App\Services;


use App\Models\Main as MainModel;

class MainService extends CRUDService
{
    protected string $model = MainModel::class;

    public function getAll()
    {
        return $this->getModel()
            ->newQuery()
            ->published()
            ->latest()
            ->get();
    }

    public function getLast($length = 1)
    {
        return $this->getModel()->newQuery()->published()->latest()->take($length)->get();
    }

    public function create($data)
    {
        return $this->save(new $this->model, $data);
    }

    public function update($id, $data)
    {
        $model = $this->getById($id);
        return $this->save($model, $data);
    }

    public function delete($id)
    {
        $model = $this->getById($id);
        return $model->delete();
    }

    protected function save($prog, $data)
    {
        $prog->fill($data);
        $prog->user()->associate(auth()->user());
        $prog->save();
        return $prog;
    }

}
