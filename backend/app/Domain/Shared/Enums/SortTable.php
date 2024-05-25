<?php

namespace Domain\Shared\Enums;

enum SortTable: string
{
    case AZ = 'az';
    case ZA = 'za';
    case Terbaru = 'terbaru';
    case Terlama = 'terlama';

    public function orderBy(): string
    {
        return match ($this) {
            self::AZ => "nama",
            self::ZA => "nama",
            self::Terbaru => "updated_at",
            self::Terlama => "updated_at",
        };
    }

    public function direction(): string
    {
        return match ($this) {
            self::AZ => "DESC",
            self::ZA => "ASC",
            self::Terbaru => "DESC",
            self::Terlama => "ASC",
        };
    }
}
