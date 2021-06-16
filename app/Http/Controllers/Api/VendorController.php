<?php

namespace App\Http\Controllers\Api;

use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\VendorResource;

class VendorController extends Controller
{
    /**
     * Display a listing of the vendors.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $query = $request->get('search');

        if ($query) {
            $keyArray = Vendor::search($query)->keys()->toArray();
            $vendors = Vendor::whereIn('id', $keyArray);
        } else {
            $vendors = Vendor::query();
        }

        return VendorResource::collection($vendors->paginate());
    }
}
