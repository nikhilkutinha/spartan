<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VendorController extends Controller
{
    /**
     * Display a listing of the vendors.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return VendorResource::collection(
            Vendor::search($request->get('search'))->paginate()
        );
    }
}
