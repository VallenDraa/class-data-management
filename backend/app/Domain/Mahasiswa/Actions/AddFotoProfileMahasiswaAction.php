<?php

namespace Domain\Mahasiswa\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\ImageFormats;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\History\Actions\AddMahasiswaHistoryAction;

class AddFotoProfileMahasiswaAction
{
    use AsAction;

    public function handle(Request $request): void
    {
        if (!$request->has('foto_profile'))
            throw BadRequestException::because('Data foto_profile tidak boleh kosong');

        $base64Parts = explode(",", $request->foto_profile);
        $base64Image = end($base64Parts);
        $decodedImage = base64_decode($base64Image);

        $mime = finfo_buffer(finfo_open(), $decodedImage, FILEINFO_MIME_TYPE);

        if (!ImageFormats::validatedValue($mime))
            throw BadRequestException::because('Format gambar kamu tidak sesuai! format yang diizinkan: (jpeg, jpg, png)');

        $namaFile = UserData::fromAuth()->id . Carbon::now()->format('Y-m-d') . '_' . time() . '.' . ImageFormats::from($mime)->getValidatedMime();

        Image::make($decodedImage)
            ->save(public_path('images/upload/' . $namaFile), 80);

        Mahasiswa::where('user_id', UserData::fromAuth()->id)
            ->firstOrFail()
            ->update([
                'foto_profile' => '/images/upload/' . $namaFile
            ]);
    }
    public function asController(Request $request): JsonResponse
    {
        if (!UserData::fromAuth()->role->canAddFotoProfileMahasiswa())
            throw new RoleForbiddenException(
                UserData::fromAuth()->role->getRequiredRole("canUpdateMahasiswa")
            );

        $this->handle($request);

        AddMahasiswaHistoryAction::handle("Melakukan perubahan foto profile", UserData::fromAuth()->id);

        return response()->json([
            'success' => [
                'message' => 'Foto profile berhasil diubah'
            ]
        ])->setStatusCode(201);
    }
}
