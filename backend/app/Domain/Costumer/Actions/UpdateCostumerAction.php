<?php

namespace Domain\Costumer\Actions;

use Domain\Costumer\Data\CostumerData;
use Domain\Costumer\Models\Costumer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateCostumerAction
{
    use AsAction;

    public function handle(CostumerData $data)
    {
        Costumer::find(Auth::user()->id)
            ->update([
                'address' => $data->address,
                'phone_number' => $data->phone_number
            ]);
    }

    public function asController(CostumerData $data): JsonResponse
    {
        $this->handle($data);

        return response()->json([
            'success' => [
                'message' => 'data berhasil diubah'
            ]
        ])->setStatusCode(200);
    }
}
