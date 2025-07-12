<?php


namespace App\Services\UserMemo;


use App\Models\UserMemo\UserMemo as UserMemoModel;
use App\Services\Admin\Query\OptionsService;
use App\Services\CRUDService;
use App\Services\FileService;

class UserMemoService extends CRUDService
{
    protected string $model = UserMemoModel::class;
    protected FileService $fileService;

    public function __construct(OptionsService $queryOptions, FileService $fileService)
    {
        parent::__construct($queryOptions);
        $this->fileService = $fileService;
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

    protected function save($userMemo, $data)
    {
        $userMemo->user()->associate(auth()->user());
        $userMemo->type()->associate($data['type']);
        $userMemo->file()->associate($this->fileService->findByArrayWithId($data['file']));
        $userMemo->save();
        return $userMemo;
    }

    public function getFileById($id)
    {
        $model = $this->getById($id); //file
        return $model->file;
    }
}
