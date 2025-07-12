<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\Admin\MenuService;
use App\Http\Resources\Admin\MenuCollection;

class MenuController extends Controller
{

    protected MenuService $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    public function index()
    {
        return new MenuCollection($this->menuService->getForCurrentUser());
    }

}
