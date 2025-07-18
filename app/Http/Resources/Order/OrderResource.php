<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class OrderResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'product_id' => $this->product_id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'amount' => $this->amount,
            'transaction_status' => $this->transaction_status,
            'reason' => $this->reason,
            'reason_сode' => $this->reason_сode,
            'sended_email' => $this->sended_email,
            'wfp_created_date' => (string)date_custom_format($this->wfp_created_date, 'Y-m-d H:i:s'),
            'wfp_processing_date' => (string)date_custom_format($this->wfp_processing_date, 'Y-m-d H:i:s'),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
