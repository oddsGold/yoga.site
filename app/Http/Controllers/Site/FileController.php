<?php


namespace App\Http\Controllers\Site;


use App\Http\Controllers\Controller;
use App\Services\FileService;
use Illuminate\Support\Facades\Log;

class FileController extends Controller
{

    protected FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function downloadPresentation($name)
    {
        try {
            $file = $this->fileService->downloadByName($name . '.pdf');
            return response()->download(public_path($file->getPathAndName()), $file->origin);
        } catch (\Exception $e) {
            Log::error('File download error: ' . $e->getMessage());
            return response()->json(['error' => 'File not found or download error'], 500);
        }
    }
}
