<?php


namespace App\Services\Admin;

use App\Services\Admin\Auth\UserService;
use App\Models\Admin\Menu;

class MenuService
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function getForCurrentUser()
    {
        $user = $this->userService->getCurrentAuthenticated();

        if($user->role->isSuperAdmin()){
            return Menu::with('submenu')->main()->get();
        }

        $resources = $user->role->resources->pluck('id')->unique();
        $response = collect();

        $menus = Menu::with(['resource', 'submenu' => function($query) use($resources){
            $query->whereResourcesOrNull($resources);
        }])->main()->get();

        foreach ($menus as $k => $menu){
            if(
                $menu->submenu->count() > 0 ||
                (
                    !$menu->isDropDown() and
                    (is_null($menu->resource) || ($menu->resource !== null && $resources->contains($menu->resource->id)))
                )
            ){
                $response->push($menu);
            }
        }

       return $response;
    }




}
