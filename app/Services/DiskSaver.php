<?php

namespace App\Services;

use App\Contracts\FileSaver;
use App\Contracts\ImageSaver;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DiskSaver implements ImageSaver, FileSaver
{

    protected string $disc = 'public';
    protected string $rootFolder = 'uploads';

    public function __construct($folder = null)
    {
        if($folder){
            $this->rootFolder .= '/' . $folder;
        }
    }

    public function save(UploadedFile $uploadFile, $name = null) : string
    {
        return is_null($name) ?
            Storage::disk($this->disc)->putFile($this->getPath(),$uploadFile) :
            Storage::disk($this->disc)->putFileAs($this->getPath(), $uploadFile, $name);
    }

    public function getPath()
    {
        return  $this->rootFolder . '/' . date('Y') . '/' . date('m');
    }

    public function delete($name)
    {
        $name = $this->getPath() . '/' . $name;
        if(Storage::disk($this->disc)->exists($name)){
            Storage::disk($this->disc)->delete($name);
        }
    }
}
