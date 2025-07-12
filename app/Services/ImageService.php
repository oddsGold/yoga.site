<?php


namespace App\Services;

use App\Contracts\ImageSaver;
use App\Models\Image;
use App\Services\Admin\Query\OptionsService;
use Illuminate\Http\UploadedFile;

class ImageService extends CRUDService
{

    protected string $model = Image::class;
    protected ImageSaver $imageSaver;

    public function __construct(ImageSaver $imageSaver, OptionsService $queryOptions)
    {
        parent::__construct($queryOptions);
        $this->imageSaver = $imageSaver;
    }

    public function save($uploadFile, $name = null)
    {
        //TODO compress images

        $name = $this->imageSaver->save($uploadFile, $name);
        $image = new $this->model;
        $image->name = basename($name);
        $image->origin = $uploadFile->getClientOriginalName();
        $image->type = $uploadFile->getClientMimeType();
        $image->path = $this->imageSaver->getPath();
        $image->size = $uploadFile->getSize();

        $image->user()->associate(auth()->user());
        $image->save();

        return $image;
    }

    public function delete($id)
    {
        $image = $this->getById($id);
        $this->imageSaver->delete($image->name);
        parent::delete($id);
    }

}
