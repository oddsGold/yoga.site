<?php

namespace App\Services;

use App\Contracts\ProductServiceInterface;
use App\Models\Product as ProductModel;

class ProductService implements ProductServiceInterface
{
    protected string $model = ProductModel::class;

    public function findProduct($id)
    {
        return (new $this->model)->find($id);
    }

    public function getLatestProduct()
    {
        return $this->getModel()->newQuery()->latest()->first();
    }

    public function getModel()
    {
        return new $this->model;
    }
}
