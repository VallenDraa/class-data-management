<?php

namespace Domain\Shared\Enums;

enum SortingTypes: string
{
    case AZ = 'az';
    case ZA = 'za';
    case Terbaru = 'terbaru';
    case Terlama = 'terlama';

    public static function validatedValue(?string $value): bool
    {
        foreach (self::cases() as $type)
            if ($type->value == $value)
                return true;

        return false;
    }

    public function column(): string
    {
        return 'users.' . match ($this) {
            self::AZ => "nama",
            self::ZA => "nama",
            self::Terbaru => "updated_at",
            self::Terlama => "updated_at",
        };
    }

    public function direction(): string
    {
        return match ($this) {
            self::AZ => "ASC",
            self::ZA => "DESC",
            self::Terbaru => "DESC",
            self::Terlama => "ASC",
        };
    }
}
