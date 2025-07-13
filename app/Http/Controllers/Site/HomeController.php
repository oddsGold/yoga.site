<?php

namespace App\Http\Controllers\Site;


use App\Services\FaqService;
use App\Services\NewsService;
use App\Services\AuthorService;
use App\Services\SocialLinksService;
use App\Services\ProgramService;
use App\Services\WorthService;
use App\Services\LearningService;
use App\Services\GetService;
use App\Services\UserMemo\TypeService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Author\AuthorResource;


class HomeController extends Controller
{

    protected FaqService $faqService;
    protected AuthorService $authorService;

    protected SocialLinksService $socialLinksService;

    protected ProgramService $programService;
    protected WorthService $worthService;
    protected GetService $getService;
    protected LearningService $learningService;

    public function __construct(
        FaqService         $faq,
        AuthorService      $author,
        SocialLinksService $socialLinks,
        ProgramService     $programService,
        WorthService       $worthService,
        GetService         $getService,
        LearningService    $learningService
    )
    {
        $this->faqService = $faq;
        $this->authorService = $author;
        $this->socialLinksService = $socialLinks;
        $this->programService = $programService;
        $this->worthService = $worthService;
        $this->getService = $getService;
        $this->learningService = $learningService;
    }


    public
    function index()
    {
        return view('site.pages.index', [
            'faqs' => $this->faqService->getAll(),
            'author' => $this->authorService->getLast(),
            'socialLinks' => $this->socialLinksService->getAllWithoutPublished(),
            'program' => $this->programService->getAllWithoutPublishedAll(),
            'worth' => $this->worthService->getAll(),
            'benefits' => $this->getService->getAll(),
            'learning' => $this->learningService->getAll(),
        ]);
    }
}
