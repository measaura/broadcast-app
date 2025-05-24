import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

if(typeof window.Echo === 'undefined') {
    window.Echo = new Echo({
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT, // Often the same as wsPort for Reverb if not using custom TLS on a different port
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
      enabledTransports: ['ws', 'wss'], // Reverb primarily uses WebSockets
      // cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, // Not typically needed for Reverb, but ensure it's removed or commented if present from a Pusher config
  });
}