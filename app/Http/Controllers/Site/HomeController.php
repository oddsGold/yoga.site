<?php

namespace App\Http\Controllers\Site;


use App\Services\FaqService;
use App\Services\NewsService;
use App\Services\VideoService;
use App\Services\SocialLinksService;
use App\Services\ProgramService;
use App\Services\WorthService;
use App\Services\GetService;
use App\Services\UserMemo\TypeService;
use App\Http\Controllers\Controller;


class HomeController extends Controller
{

    protected FaqService $faqService;
    protected VideoService $videoService;

    protected SocialLinksService $socialLinksService;

    protected ProgramService $programService;
    protected WorthService $worthService;
    protected GetService $getService;

    public function __construct(
        FaqService $faq,
        VideoService $video,
        SocialLinksService $socialLinks,
        ProgramService $programService,
        WorthService $worthService,
        GetService $getService
    ){
        $this->faqService = $faq;
        $this->videoService = $video;
        $this->socialLinksService = $socialLinks;
        $this->programService = $programService;
        $this->worthService = $worthService;
        $this->getService = $getService;
    }

    public function index()
    {
        return view('site.pages.index',[
            'faqs' => $this->faqService->getAll(),
            'author' => $this->videoService->getAll(),
            'socialLinks' => $this->socialLinksService->getAllWithoutPublished(),
            'program' => $this->programService->getAllWithoutPublishedAll(),
            'worth' => $this->worthService->getAll(),
            'benefits' => $this->getService->getAll(),
        ]);
    }
}
