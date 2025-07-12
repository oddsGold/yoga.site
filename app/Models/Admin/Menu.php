<?php


namespace App\Models\Admin;


use App\Models\Resource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory,
        SoftDeletes;

    protected $table = 'admin_menus';

    protected $fillable = [
        'parent_id',
        'name',
        'urn',
        'material_icon'
    ];

    public function scopeMain($query)
    {
        return $query->WhereNull('parent_id');
    }

    public function scopeWhereResourcesOrNull($query, $resources = [])
    {
        return $query->WhereIn('resource_id', $resources)
            ->orWhereNull('resource_id');
    }

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }

    public function submenu()
    {
        return $this->hasMany(Menu::class, 'parent_id','id' );
    }

    public function parents()
    {
        return $this->belongsTo(Menu::class, 'parent_id', 'id');
    }

    public function isDropDown()
    {
        return !(bool)$this->urn;
    }


}
