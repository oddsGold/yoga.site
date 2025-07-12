<?php


namespace App\Http\Requests\Admin;



class FileRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'data' => 'required|file|mimes:csv,txt,xlx,xls,xlsx,pdf,doc,dot,docx,rtf,xml,zip,tar,gtar',
        ];
    }

}
