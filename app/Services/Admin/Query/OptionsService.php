<?php


namespace App\Services\Admin\Query;


use Illuminate\Http\Request;

class OptionsService
{

    protected SortService $sortService;
    protected SearchService $searchService;
    protected FilterService $filterService;
    protected PaginateService $paginateService;
    protected Request $request;

    public function __construct(
        Request $request, SortService $sortService, SearchService $searchService,
        FilterService $filterService, PaginateService $paginateService
    ){
        $this->sortService = $sortService;
        $this->filterService = $filterService;
        $this->searchService = $searchService;
        $this->paginateService = $paginateService;
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
