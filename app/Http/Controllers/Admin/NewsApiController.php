<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\NewsApiService;

class NewsApiController extends Controller
{
    public function getNews(NewsApiService $newsApiService)
    {
        return response()->json(
            $newsApiService->getYogaNews()
        );
    }

    public function getAllNews(NewsApiService $newsApiService)
    {
        return response()->json(
            $newsApiService->getNews()
        );
    }
}
