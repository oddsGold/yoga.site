<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bonus\BonusCreateRequest;
use App\Http\Requests\Admin\Bonus\BonusUpdateRequest;
use App\Http\Resources\Bonus\BonusCollection;
use App\Http\Resources\Bonus\BonusResource;
use App\Services\BonusService;

class BonusController extends Controller
{
    protected BonusService $bonusService;
    public function __construct(BonusService $item)
    {
        $this->bonusService = $item;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->bonusService->getModel()));
        return new BonusCollection($this->bonusService->getAllWithPagination());
    }

    public function store(BonusCreateRequest $request)
    {
        $this->authorize('create', get_class($this->bonusService->getModel()));
        return new BonusResource($this->bonusService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->bonusService->getModel());
        return new BonusResource($this->bonusService->getById($id));
    }

    public function update(BonusUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->bonusService->getModel());
        return new BonusResource($this->bonusService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->bonusService->getModel());
        $this->bonusService->delete($id);
    }
}
