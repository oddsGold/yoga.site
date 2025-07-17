<?php


use Illuminate\Support\Str;

if (!function_exists('base64UrlEncode')) {
    function base64UrlEncode($data)
    {
        //return strtr(base64_encode($data), '+/=', '-_,');
        return str_replace(
            ['+', '/', '='],
            ['-', '_', ''],
            base64_encode($data)
        );
    }
}


if (!function_exists('base64UrlDecode')) {
    function base64UrlDecode($data)
    {
        return base64_decode(str_replace(
            ['-', '_'],
            ['+', '/'],
            $data
        ));
        //return base64_decode(strtr($data, '-_,', '+/='));
    }
}

if (!function_exists('date_custom_format')) {
    function date_custom_format($date, $format = null)
    {
        return is_null($date) ? $date : Carbon\Carbon::parse($date)
            ->format($format ? $format : 'd.m.Y H:i:s');
    }
}

if (!function_exists('str_limit_text')) {
    function str_limit_text($length = 140, $text = '', $alternativeText = '')
    {
        if($text == '' || is_null($text)){
            $text = $alternativeText;
        }

        $text = strip_tags($text);
        $text = trim($text);

        return \Illuminate\Support\Str::limit($text, $length, $end = '...');
    }
}

if (!function_exists('format_phone_number')) {
    function format_phone_number($phone)
    {
        $phone = str_replace(['-',' ','(',')'], '',$phone);
        if(Str::length($phone) >= 7){
            if(mb_substr($phone, 0 ,1) == '0'){
                $phone = '38'.$phone;
            }
            if(mb_substr($phone, 0 ,3) == '380'){
                $phone = '+'.$phone;
            }
            $phone = (Str::length($phone) - 7 >= 3 ?
                    (mb_substr($phone, 0, Str::length($phone) - 10).'('.mb_substr($phone,-10,3).')') :
                    mb_substr($phone, 0, Str::length($phone) - 7)
                ) . ' '
                .mb_substr($phone,-7,3).'-'
                .mb_substr($phone,-4,2).'-'
                .mb_substr($phone,-2,2);
        }
        return $phone;
    }
}

if (!function_exists('find_phone_numbers_from_text')) {
    function find_phone_numbers_from_text($text)
    {
        preg_match_all('/(\+?(38|)(\([0-9]{2,5}\)|[0-9 ]{1,4})[\- ]{0,2}[0-9]{1,4}[\- ]{0,2}[0-9]{1,4}[\- ]{0,2}[0-9]{1,4}([\- ]{0,2}[0-9]{2,4}?|)|([0-9]{4,6}))/miu', $text, $matches);
        return (count($matches) > 0 && count($matches[0]) > 0) ? $matches[0] : [];
    }
}

if (!function_exists('read_file_by_iterable_lines')){
    function read_file_by_iterable_lines($fileAndPath)
    {
        if(!filesize($fileAndPath)){
            return [];
        }
        $handle = fopen($fileAndPath, "r");
        while(!feof($handle)) {
            yield fgets($handle);
        }
        fclose($handle);

    }
}

if (!function_exists('add_br_to_title')) {
    function add_br_to_title($string)
    {

        $br = '<br>';
        $words = explode(' ', $string);
        $count = count($words);
        if($count > 1){
            if($count){
                $string = $words[0] . $br . $words[1];
            }

            for($w = 0; $w < count($words); $w++){

                $line_first = '';
                $line_second = '';

                for($f = 0; $f <= $w; $f++){
                    $line_first .= $words[$f] . ' ';
                }

                for($s = $w + 1; $s < count($words); $s++){
                    $line_second .= $words[$s] . ' ';
                }

                $line_first = trim($line_first);
                $line_second = trim($line_second);

                if(Str::length($line_first) <= Str::length($line_second)){
                    $string = $line_first . $br . $line_second;
                }
            }
        }

        return $string;
    }
}

if (!function_exists('parse_host')){
    function parse_host($url)
    {
        $info = parse_url($url);
        if($info && is_array($info) && isset($info['host'])){
            $url = $info['host'];
        }
        return $url;
    }
}

if (!function_exists('convert_number_to_text')) {
    function convert_number_to_text($number)
    {
        $dic = array(
            array(
                -2	=> 'дві',
                -1	=> 'одна',
                1	=> 'одна',
                2	=> 'дві',
                3	=> 'три',
                4	=> 'чотири',
                5	=> 'п`ять',
                6	=> 'шість',
                7	=> 'сім',
                8	=> 'вісім',
                9	=> 'дев`ять',
                10	=> 'десять',
                11	=> 'одинадцять',
                12	=> 'дванадцять',
                13	=> 'тринадцять',
                14	=> 'чотирнадцять' ,
                15	=> 'п`ятнадцять',
                16	=> 'шістнадцять',
                17	=> 'сімнадцять',
                18	=> 'вісімнадцять',
                19	=> 'дев`ятнадцять',
                20	=> 'двадцять',
                30	=> 'тридцять',
                40	=> 'сорок',
                50	=> 'п`ятдесят',
                60	=> 'шістдесят',
                70	=> 'сімдесят',
                80	=> 'вісімдесят',
                90	=> 'дев`яносто',
                100	=> 'сто',
                200	=> 'двісті',
                300	=> 'триста',
                400	=> 'чотириста',
                500	=> 'п`ятсот',
                600	=> 'шістсот',
                700	=> 'сімсот',
                800	=> 'вісімсот',
                900	=> 'дев`ятсот'
            ),

            array(
                array('гривня', 'ривні', 'гривень'),
                array('тисяча', 'тисячі', 'тисяч'),
                array('мільйон', 'мільйона', 'мільйонів'),
                array('мільярд', 'мільярда', 'мільярдів'),
            ),

            array(
                2, 0, 1, 1, 1, 2
            )
        );
        $string = array();
        $number = str_pad($number, ceil(strlen($number)/3)*3, 0, STR_PAD_LEFT);

        $parts = array_reverse(str_split($number,3));

        foreach($parts as $i=>$part) {
            if($part>0) {
                $digits = array();

                if($part>99) {
                    $digits[] = floor($part/100)*100;
                }

                if($mod1=$part%100) {
                    $mod2 = $part%10;
                    $flag = $i==1 && $mod1!=11 && $mod1!=12 && $mod2<3 ? -1 : 1;
                    if($mod1<20 || !$mod2) {
                        $digits[] = $flag*$mod1;
                    } else {
                        $digits[] = floor($mod1/10)*10;
                        $digits[] = $flag*$mod2;
                    }
                }

                $last = abs(end($digits));

                foreach($digits as $j=>$digit) {
                    $digits[$j] = $dic[0][$digit];
                }

                $digits[] = $dic[1][$i][(($last%=100)>4 && $last<20) ? 2 : $dic[2][min($last%10,5)]];

                array_unshift($string, join(' ', $digits));
            }
        }

        return join(' ', $string);

    }
}
