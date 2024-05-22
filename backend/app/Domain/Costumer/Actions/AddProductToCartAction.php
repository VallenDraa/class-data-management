<?php

namespace Domain\Costumer\Actions;

use App\Exceptions\BadRequestException;
use Domain\Costumer\Models\Carts;
use Domain\Costumer\Models\Costumer;
use Domain\Product\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddProductToCartAction
{
    use AsAction;

    public function handle(int $productId)
    {
        $costumer = Costumer::where('user_id', Auth::user()->id)
            ->first();

        $cart = Carts::where('product_id', $productId)
            ->where('costumers_id', $costumer->id)
            ->first();

        if ($cart) {
            $cart->update([
                'quantity' => ($cart->quantity + 1)
            ]);
        } else {
            Carts::create([
                'product_id' => $productId,
                'costumer_id' => $costumer->id,
                'quantity' => 1
            ]);
        }
    }

    public function asController(Request $request): JsonResponse
    {
        if (!$request->product_id) {
            throw BadRequestException::because("product_id tidak boleh kosong");
        }

        $this->handle($request->product_id);

        return response()->json([
            'success' => [
                'message' => 'Produk berhasil ditambahkan ke cart'
            ]
        ])->setStatusCode(201);
    }
}
