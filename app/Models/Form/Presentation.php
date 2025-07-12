<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presentation extends Model
{
    use HasFactory;

    protected $table = 'form_presentation';

    protected $fillable = [
        'name',
        'nickname',
        'phone',
        'email',
        'ip_address',
        'user_agent',
    ];
}
