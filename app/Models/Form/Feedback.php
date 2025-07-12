<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'form_feedbacks';

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
