<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    use HasFactory;

    protected $table = 'form_buy';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'edrpou',
        'orgName',
        'type',
        'accountable',
        'question',
        'ip_address',
        'user_agent',
    ];
}
