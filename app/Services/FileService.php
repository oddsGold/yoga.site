<?php


namespace App\Services;


use App\Contracts\FileSaver;
use App\Services\Admin\Query\OptionsService;
use Illuminate\Http\UploadedFile;
use App\Models\File;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FileService extends CRUDService
{


    protected FileSaver $fileSaver;
    protected string $model = File::class;

    public function __construct(FileSaver $fileSaver, OptionsService $queryOptions)
    {
        parent::__construct($queryOptions);
        $this->fileSaver = $fileSaver;
    }

    public function save($uploadFile, $name = null)
    {
        $name = $this->fileSaver->save($uploadFile, $name);
        $file = new $this->model;
        $file->name = basename($name);
        $file->origin = $uploadFile->getClientOriginalName();
        $file->type = $uploadFile->getClientMimeType();
        $file->path = $this->fileSaver->getPath();
        $file->size = $uploadFile->getSize();

        $file->user()->associate(auth()->user());
        $file->save();

        return $file;
    }

    public function downloadByName($name)
    {
        try {
            $file = File::where('name', $name)->first();
            return $file;
        } catch (\Exception $e) {
            Log::error('File download error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function delete($id)
    {
        $file = $this->getById($id);
        $this->fileSaver->delete($file->name);
        parent::delete($id);
    }

}
