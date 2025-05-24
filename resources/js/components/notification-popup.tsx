import React, { useState, useEffect, useCallback } from 'react';
import { useEchoPublic } from '@laravel/echo-react'; // The hook

interface NotificationMessage {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationPopup: React.FC = () => {
  const [notification, setNotification] = useState<NotificationMessage | null>(null);

  const handleNotification = useCallback((eventPayload: NotificationMessage) => {
    console.log('===NOTIFICATION RECEIVED===');
    console.log('Event Payload:', eventPayload);
    console.log('Type of eventPayload:', typeof eventPayload);
    console.log('eventPayload Keys:', Object.keys(eventPayload || {}));

    let parsedData = eventPayload;
    // If the payload is a string, try to parse it as JSON
    if (typeof eventPayload === 'string') {
      try {
        parsedData = JSON.parse(eventPayload);
        console.log('Parsed Data:', parsedData);
      } catch (error) {
        console.error('Failed to parse eventPayload as JSON:', error);
      }
    }

    const message = parsedData?.message || 'Unknown message';
    const type = parsedData?.type || 'info';
    console.log('Extracted Message:', message, 'Type:', type);
    // Set the notification state with the parsed data
    setNotification({
      message: message,
      type: type as 'info' | 'success' | 'warning' | 'error',
    });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  type NotificationData = {
    data:{
      message: string;
      type: 'info' | 'success' | 'warning' | 'error'; 
    }

  }
  console.log('before useEchoPublic.');
  //{"event":"UserNotification","data":"{\"message\":\"Hello from Postman!\",\"type\":\"success\"}","channel":"notifications"}	1748088103.4640136
  useEchoPublic<NotificationData>( // Optional: Generic type for the payload
    'notifications',                             // Channel Name
    //".App\\Events\\UserNotification",            // Event Name (prefixed with '.')
    //".App.Events.UserNotification",            // Event Name (prefixed with '.')
    "UserNotification", // Event Name (prefixed with '.')
     //handleNotification, // Callback
     (e) => {
      console.log('Notification received (via useEchoPublic):', e.data.message, 'Type:', e.data.type);
      // handleNotification(e.data);
     },
  );
  
  // Log when the component mounts to see if the subscription occurs implicitly
  useEffect(() => {
    console.log('NotificationPopup mounted. useEchoPublic should be handling subscription and listening.');
    // We can also check if the global Echo instance's channels list reflects this subscription for debugging.
    // if ((window as any).Echo) {
    //   console.log('Current Echo channels:', (window as any).Echo.connector.channels);
    // }
  }, []);


  if (!notification) {
    return null;
  }

  const getBackgroundColor = (): string => {
    switch (notification.type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px',
        color: 'white',
        zIndex: 1000,
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
      className={getBackgroundColor()}
    >
      <strong>{notification.type.toUpperCase()}:</strong> {notification.message}
    </div>
  );
};

export default NotificationPopup;