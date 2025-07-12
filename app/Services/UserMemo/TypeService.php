<?php


namespace App\Services\UserMemo;


use App\Models\UserMemo\Type as TypeModel;
use App\Services\CRUDService;

class TypeService extends CRUDService
{
    protected string $model = TypeModel::class;

    public function getSotaApiCrs()
    {
        return $this->getById(TypeModel::SOTA_API_CRS);
    }

    public function getSotaCrs()
    {
        return $this->getById(TypeModel::SOTA_CRS);
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

    protected function save($type, $data)
    {
        $type->fill($data);
        $type->user()->associate(auth()->user());
        $type->save();
        return $type;
    }
}
