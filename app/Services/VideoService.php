<?php


namespace App\Services;


use App\Models\Video as VideoModel;
use App\Services\Admin\Query\OptionsService;
use App\Services\CRUDService;
use App\Services\ImageService;

class VideoService extends CRUDService
{
    protected string $model = VideoModel::class;
    protected ImageService $imageService;


    public function __construct(OptionsService $queryOptions, ImageService $imageService)
    {
        parent::__construct($queryOptions);
        $this->imageService = $imageService;
    }

    public function getAll()
    {
        return $this->getModel()
            ->newQuery()
            ->latest()
            ->get();
    }

    protected function save($video, $data)
    {
        $video->fill($data);
        //$video->url = $this->convertYoutubeUrl($data['url']);
        if (isset($data['desktop_preview'])) {
            $desktopImage = $this->imageService->findByArrayWithId($data['desktop_preview']);
            $video->desktopPreview()->associate($desktopImage); // Прив'язка до desktop_preview_id
        }

        if (isset($data['tablet_preview'])) {
            $tabletImage = $this->imageService->findByArrayWithId($data['tablet_preview']);
            $video->tabletPreview()->associate($tabletImage); // Прив'язка до tablet_preview_id
        }

        if (isset($data['mobile_preview'])) {
            $mobileImage = $this->imageService->findByArrayWithId($data['mobile_preview']);
            $video->mobilePreview()->associate($mobileImage); // Прив'язка до mobile_preview_id
        }
        $video->user()->associate(auth()->user());
        $video->save();
        return $video;
    }

    public function convertYoutubeUrl($url)
    {
        if($url && !str_contains($url, 'embed')){
            $urlInfo = parse_url($url);
            if(count($urlInfo) > 0 && isset($urlInfo['query'])){
                $queryParams = [];
                parse_str($urlInfo['query'], $queryParams);
                if(count($queryParams) > 0 && isset($queryParams['v'])){
                    $url = 'https://www.youtube.com/embed/' . $queryParams['v'];
                }
            }
        }
        return $url;
    }
}
