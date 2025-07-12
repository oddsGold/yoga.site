<?php


namespace App\Services\Admin\Auth;


use App\Models\User as UserModel;
use App\Services\Admin\Query\OptionsService;
use App\Services\CRUDService;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Validation\ValidationException;

class UserService extends CRUDService
{

    protected string $model = UserModel::class;
    protected Hasher $hashManager;

    public function __construct(OptionsService $queryOptions, Hasher $hashManager)
    {
        parent::__construct($queryOptions);
        $this->hashManager = $hashManager;
    }

    public function create($data)
    {
        return $this->save(new $this->model, $data);
    }

    public function update($id, $data)
    {
        return $this->save($this->getById($id), $data);
    }

    protected function save($user, $data)
    {
        $user->login = $data['login'];
        $user->email = $data['email'];
        $user->tfa = $data['tfa'];
        if(isset($data['password']) && !is_null($data['password']) && $data['password']){
            $user->password = $this->hashManager->make($data['password']);
        }
        $user->role()->associate($data['role']);
        $user->save();
        return $user;
    }

    public function getCurrentAuthenticated()
    {
        return auth()->user();
        //return $this->getById(auth()->id());
    }

    public function setTfaSecret($user, $secret)
    {
        $user->setTfaSecret($secret);
        return $user->save();
    }

    public function getTfaSecret($user)
    {
        return $user->getTfaSecret();
    }

    public function isEnabledTfa($user)
    {
        return $user->isTfaEnabled();
    }

    public function getLogin($user)
    {
        return $user->getLogin();
    }

    public function isFirstLogin($user)
    {
        return is_null($user->last_login_at);
    }

    public function setLastLogin($user)
    {
        $user->last_login_at = date('Y-m-d H:i:s');
        return $user->save();
    }

    public function changePasswordCurrentUser($request)
    {
        $user = $this->getCurrentAuthenticated();
        if($this->hashManager->check($request->old_password, $user->getAuthPassword())){
            $user->password = $this->hashManager->make($request->password);
            return $user->save();
        }
        throw ValidationException::withMessages(['old_password' => 'The old password is not correct.']);
    }

    public function changeEmailCurrentUser($request)
    {
        $user = $this->getCurrentAuthenticated();
        $user->email = $request->email;
        return $user->save();
    }


}
