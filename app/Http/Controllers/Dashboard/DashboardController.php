<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     * 
     * @return \Inertia\Response
     */
    public function show()
    {
        return Inertia::render('Dashboard/Game/Index');
    }
}
