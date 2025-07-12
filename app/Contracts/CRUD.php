<?php


namespace App\Contracts;


interface CRUD
{

    public function create($data);

    public function getBy($name, $value);

    public function getById($id);

    public function getLast($length = 1);

    public function getAll();

    public function getAllWithPagination();

    public function delete($id);

    public function update($id, $data);

    public function getModel();

    public function fillSlug($slug, $title, $withTimestamp = true);

}
