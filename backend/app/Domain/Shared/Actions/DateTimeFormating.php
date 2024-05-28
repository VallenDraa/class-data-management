<?php

namespace Domain\Shared\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class DateTimeFormating
{
    use AsAction;

    public static function handle($dateString): string
    {
        // Memisahkan tanggal dan waktu
        list($datePart, $timePart) = explode(' ', $dateString);

        // Memisahkan tahun, bulan, dan hari
        list($year, $month, $day) = explode('-', $datePart);

        // Array nama bulan
        $months = [
            '01' => 'Jan', '02' => 'Feb', '03' => 'Mar', '04' => 'Apr',
            '05' => 'May', '06' => 'Jun', '07' => 'Jul', '08' => 'Aug',
            '09' => 'Sep', '10' => 'Oct', '11' => 'Nov', '12' => 'Dec'
        ];

        // Mendapatkan nama bulan dari array
        $monthName = $months[$month];

        // Menggabungkan kembali dalam format yang diinginkan
        return "{$day} {$monthName} {$year}";
    }
}
