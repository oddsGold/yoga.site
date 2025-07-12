<?php


namespace App\Services;


use App\Models\Form\Presentation as PresentationModel;

class FormPresentationService extends CRUDService
{
    protected string $model = PresentationModel::class;

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

    public function delete($id)
    {
        $model = $this->getById($id);
        return $model->delete();
    }

}
