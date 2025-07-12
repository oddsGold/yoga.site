<?php


namespace App\Services;


class MedocApiService extends HttpService
{

    protected $host = 'https://api.medoc.ua/';


    public function setPriceToIsPro(
        $edrpou = '', $name = '', $acc = '', $inSlfSchRcd = '', $inCdSte = '', $inRcdJr = '',
        $codes = [], $units = [], $counts = [], $sums = [], $comment = '', $idPlatnik = '', $phone = ''
    ){

        $nomen_mas_for_export = '';
        $shtuk_export = '';
        $kol_term_mas_for_export = '';
        $bufd1_mas_for_export = '';

        $separator = '*';

        for($i = 0; $i < count($codes); $i++){
            $nomen_mas_for_export .= $codes[$i] . $separator;
            $shtuk_export .= $units[$i] . '*';
            $kol_term_mas_for_export .= $counts[$i] . $separator;
            $bufd1_mas_for_export .= $sums[$i] . $separator;
        }


        $data = [
            'edrpo' => $edrpou,
            'id_platnik' => $idPlatnik,
            'platnik' => $name,
            'suggest1' => '',
            'dop1' => '',
            'dop2' => '',
            'dop3' => '',
            'dop4' => '',
            'dop5' => '',
            'dop6' => '',
            'telefon' => $phone,
            'InSlfSchRcd' => $inSlfSchRcd,
            'nomer_sheta' => $acc . '-' . $edrpou,
            'InCdSte' => $inCdSte,
            'InRcdJr' => $inRcdJr,
            'nomen_mas_for_export' => $nomen_mas_for_export,
            'shtuk_export' => $shtuk_export,
            'kol_term_mas_for_export' => $kol_term_mas_for_export,
            'bufd1_mas_for_export' => $bufd1_mas_for_export,
            'comment' => $comment
        ];


        $response = $this->post('lic/to_is_pro_from_program_medoc.php', $data);
        if(is_null($response) || $response->failed() || trim($response->body()) == ''){
            $response = $this->post('lic/to_is_pro_from_program_medoc.php', $data);
        }
    }

}
