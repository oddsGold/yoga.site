<?php


namespace App\Services;


use App\Models\Author as AuthorModel;
use App\Services\Admin\Query\OptionsService;
use App\Services\CRUDService;
use App\Services\ImageService;

class AuthorService extends CRUDService
{
    protected string $model = AuthorModel::class;
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

    protected function save($item, $data)
    {
        $item->fill($data);

        if (array_key_exists('desktop_preview', $data)) {
            if ($data['desktop_preview']) {
                $desktopImage = $this->imageService->findByArrayWithId($data['desktop_preview']);
                $item->desktopPreview()->associate($desktopImage);
            } else {
                $item->desktopPreview()->dissociate();
            }
        }

        if (array_key_exists('tablet_preview', $data)) {
            if ($data['tablet_preview']) {
                $tabletImage = $this->imageService->findByArrayWithId($data['tablet_preview']);
                $item->tabletPreview()->associate($tabletImage);
            } else {
                $item->tabletPreview()->dissociate();
            }
        }

        if (array_key_exists('mobile_preview', $data)) {
            if ($data['mobile_preview']) {
                $mobileImage = $this->imageService->findByArrayWithId($data['mobile_preview']);
                $item->mobilePreview()->associate($mobileImage);
            } else {
                $item->mobilePreview()->dissociate();
            }
        }

        $item->user()->associate(auth()->user());
        $item->save();
        return $item;
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
