<?php


namespace App\Models;


use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory,
        Searchable;

    protected $fillable = [
        'product_id',
        'name',
        'phone',
        'email',
        'amount',
        'transaction_status',
        'reason',
        'reason_code',
        'sended_email',
        'wfp_created_date',
        'wfp_processing_date',
        'created_at'
    ];
}
