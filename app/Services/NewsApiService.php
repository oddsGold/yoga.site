<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class NewsApiService
{
    protected Client $client;
    protected string $apiKey;
    protected string $host;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('RAPIDAPI_KEY');
        $this->host = 'real-time-news-data.p.rapidapi.com';
    }

    /**
     * Отримує новини про йогу
     *
     * @param int $limit
     * @param string $country
     * @param string $lang
     * @param string $timePublished
     * @return array
     * @throws GuzzleException
     */
    public function getYogaNews(
        int $limit = 12,
        string $country = 'US',
        string $lang = 'en',
        string $timePublished = 'anytime'
    ): array {
        $response = $this->client->request('GET', 'https://'.$this->host.'/search', [
            'headers' => [
                'X-RapidAPI-Key' => $this->apiKey,
                'X-RapidAPI-Host' => $this->host
            ],
            'query' => [
                'query' => 'yoga OR meditation OR mindfulness',
                'limit' => $limit,
                'country' => $country,
                'lang' => $lang,
                'time_published' => $timePublished
            ]
        ]);

        $data = json_decode($response->getBody(), true);

        return $data['data'] ?? [];
    }

    /**
     * Універсальний метод для отримання новин за параметрами
     *
     * @param string $query
     * @param int $limit
     * @param string $country
     * @param string $lang
     * @param string $timePublished
     * @return array
     * @throws GuzzleException
     */
    public function searchNews(
        string $query,
        int $limit = 10,
        string $country = 'US',
        string $lang = 'en',
        string $timePublished = 'anytime'
    ): array {
        $response = $this->client->request('GET', 'https://'.$this->host.'/search', [
            'headers' => [
                'X-RapidAPI-Key' => $this->apiKey,
                'X-RapidAPI-Host' => $this->host
            ],
            'query' => [
                'query' => $query,
                'limit' => $limit,
                'country' => $country,
                'lang' => $lang,
                'time_published' => $timePublished
            ]
        ]);

        return json_decode($response->getBody(), true)['data'] ?? [];
    }
}
