<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\UserNotification;
use Illuminate\Support\Facades\Log;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::middleware('auth:sanctum')->post('/notify', function (Request $request) {
//     $message = $request->input('message', 'Default notification message');
//     $type = $request->input('type', 'info');

//     event(new UserNotification($message, $type));

//     return response()->json(['status' => 'Notification sent']);
// });

Route::post('/send-notification', function (Request $request) {
    // log::info('Received notification request', $request->all());
    $validated = $request->validate([
        'message' => 'required|string|max:255',
        'type' => 'sometimes|string|in:info,success,warning,error',
    ]);

    $message = $validated['message'];
    $type = $validated['type'] ?? 'info'; // Default to 'info' if not provided

    try {
        // log::info('Dispatching UserNotification event', ['message' => $message, 'type' => $type]);
        // Dispatch the UserNotification event
        UserNotification::dispatch($message, $type);

        return response()->json([
            'status' => 'success',
            'message_sent' => $message,
            'type' => $type,
        ]);
    } catch (\Exception $e) {
        // Log the error for debugging
        Log::error('Failed to dispatch UserNotification event: ' . $e->getMessage());
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to send notification.',
        ], 500);
    }
});

// Route::middleware('auth:sanctum')->post('/send-notification', function (Request $request) {
//     log::info('Received notification request', $request->all());
//     $validated = $request->validate([
//         'message' => 'required|string|max:255',
//         'type' => 'sometimes|string|in:info,success,warning,error',
//     ]);

//     $message = $validated['message'];
//     $type = $validated['type'] ?? 'info'; // Default to 'info' if not provided

//     try {
//         UserNotification::dispatch($message, $type);
//         // Or: event(new UserNotification($message, $type));

//         return response()->json([
//             'status' => 'success',
//             'message_sent' => $message,
//             'type' => $type,
//         ]);
//     } catch (\Exception $e) {
//         // Log the error for debugging
//         \Illuminate\Support\Facades\Log::error('Failed to dispatch UserNotification event: ' . $e->getMessage());
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Failed to send notification.',
//         ], 500);
//     }
// });

// If you plan to secure this endpoint later (e.g., only allow admins to send global notifications)
// you can add middleware:
// Route::post('/send-notification', function (Request $request) { ... })->middleware('auth:sanctum', 'admin'); // Example
