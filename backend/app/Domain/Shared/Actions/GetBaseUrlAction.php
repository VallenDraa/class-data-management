<?php

namespace Domain\Shared\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class GetBaseUrlAction
{
    use AsAction;

    public static function handle(): string
    {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://" .
        $_SERVER['HTTP_HOST'];
    }
}
