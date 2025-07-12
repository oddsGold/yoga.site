<?php


namespace App\Services\Admin\Auth;


use App\Models\Permission;
use App\Models\Role as RoleModel;
use App\Services\Admin\Query\OptionsService;
use App\Services\CRUDService;

class RoleService extends CRUDService
{

    protected string $model = RoleModel::class;

    public function __construct(OptionsService $queryOptions)
    {
        parent::__construct($queryOptions);
    }

    public function getByName($name)
    {
        return $this->getBy('name',$name);
    }

    public function getHttpExceptionRole()
    {
        return $this->getByName(RoleModel::HTTP_EXCEPTION_NAME);
    }

    public function getErrorExceptionRole()
    {
        return $this->getByName(RoleModel::ERROR_EXCEPTION_NAME);
    }

    public function create($data)
    {
        $data['name'] = $this->fillSlug(null, $data['label']);
        return $this->save(new $this->model, $data);
    }

    public function update($id, $data)
    {
        return $this->save($this->getById($id), $data);
    }

    protected function save($role, $data)
    {
        $role->fill($data);
        $role->save();
        $role->resources()->detach();
        foreach (Permission::all() as $permission){
            $resources = [];
            foreach ($data['resources'] as $resource){
                $resources[$resource] = ['permission_id' => $permission->id];
            }
            $role->resources()->attach($resources);
        }
        return $role;
    }
}
