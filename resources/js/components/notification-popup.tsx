import React, { useState, useEffect, useCallback } from 'react';
import { useEchoPublic } from '@laravel/echo-react'; // The hook

interface NotificationMessage {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationPopup: React.FC = () => {
  const [notification, setNotification] = useState<NotificationMessage | null>(null);

  const handleNotification = useCallback((payload: any) => {
    // console.log('Raw notification payload:', payload);

    // Handle different payload formats
    let messageData: NotificationMessage;
    messageData = payload;

    // Set the notification state with the parsed data
    setNotification({
      message: messageData.message,
      type: messageData.type || 'info'
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

  useEchoPublic<NotificationData>( // Optional: Generic type for the payload
    'notifications',      // Channel Name
    "UserNotification",   // Event Name (prefixed with '.')
     handleNotification,  // Callback
  );
  
  // Log when the component mounts to see if the subscription occurs implicitly
  useEffect(() => {
    console.log('NotificationPopup mounted. useEchoPublic should be handling subscription and listening.');
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