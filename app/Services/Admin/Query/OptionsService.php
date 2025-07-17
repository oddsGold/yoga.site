<?php


namespace App\Services\Admin\Query;

use App\Contracts\JWT;
use Illuminate\Http\Request;

class OptionsService
{

    protected SortService $sortService;
    protected SearchService $searchService;
    protected FilterService $filterService;
    protected PaginateService $paginateService;
    protected JWT $JWTService;
    protected Request $request;

    public function __construct(
        Request $request, SortService $sortService, SearchService $searchService,
        FilterService $filterService, PaginateService $paginateService, JWT $JWTService
    ){
        $this->sortService = $sortService;
        $this->filterService = $filterService;
        $this->searchService = $searchService;
        $this->paginateService = $paginateService;
        $this->JWTService = $JWTService;
        $this->request = $request;
    }

    public function apply($query)
    {
        return $this->paginateService->apply(
            $this->filterService->apply(
                $this->sortService->apply(
                    $this->searchService->apply($query, $this->request), $this->request
                ),
                $this->request
            )
        );
    }


}
