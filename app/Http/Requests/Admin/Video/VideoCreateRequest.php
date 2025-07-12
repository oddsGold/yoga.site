<?php


namespace App\Http\Requests\Admin\Video;


use App\Http\Requests\Site\BaseRequest;

class VideoCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'url' => 'required|string|max:255',
            'preview' => 'nullable',

            // Валідація для desktop preview
            'desktop_preview_id' => 'nullable|exists:images,id',
            'desktop_preview_name' => 'nullable|string',
            'desktop_preview_path' => 'nullable|string',
            'desktop_preview_url' => 'nullable|string',

            // Валідація для tablet preview
            'tablet_preview_id' => 'nullable|exists:images,id',
            'tablet_preview_name' => 'nullable|string',
            'tablet_preview_path' => 'nullable|string',
            'tablet_preview_url' => 'nullable|string',

            // Валідація для mobile preview
            'mobile_preview_id' => 'nullable|exists:images,id',
            'mobile_preview_name' => 'nullable|string',
            'mobile_preview_path' => 'nullable|string',
            'mobile_preview_url' => 'nullable|string',
        ];
    }
}
