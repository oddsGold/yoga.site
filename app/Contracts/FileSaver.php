<?php

namespace App\Contracts;

use Illuminate\Http\UploadedFile;

interface FileSaver
{
    public function save(UploadedFile $uploadFile, $name = null);

    public function getPath();

    public function delete($name);
}
