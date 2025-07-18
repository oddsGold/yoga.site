<?php


namespace App\Services;


use App\Models\Order as OrderModel;

class OrderService extends CRUDService
{
    protected string $model = OrderModel::class;

    public function getAll()
    {
        return $this->getModel()
            ->newQuery()
            ->latest()
            ->get();
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

    protected function save($item, $data)
    {
        $item->fill($data);
        $item->save();
        return $item;
    }

}
