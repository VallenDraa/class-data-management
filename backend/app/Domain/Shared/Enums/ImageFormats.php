<?php

namespace Domain\Shared\Enums;

use Domain\Shared\Exceptions\BadRequestException;

enum ImageFormats: string
{
    case JPEG = 'image/jpeg';
    case JPG = 'image/jpg';
    case PNG = 'image/png';

    public function getValidatedMime(): string
    {
        return match ($this) {
            self::JPEG => "jpeg",
            self::JPG => "jpg",
            self::PNG => "png",
        };
    }

    public static function validatedValue(?string $value): bool
    {
        foreach (self::cases() as $type)
            if ($type->value == $value)
                return true;

        return false;
    }
}
