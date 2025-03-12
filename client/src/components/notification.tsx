import { useState, useEffect } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
    message: string;
    type: NotificationType;
    onClose: () => void;
}

// Компонент для показа уведлмлений

export const Notification = ({ message, type, onClose }: NotificationProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getColor = () => {
        switch (type) {
            case 'success': return 'bg-green-100 text-green-700';
            case 'error': return 'bg-red-100 text-red-700';
        }
    };

    return (
        <div className="fixed top-4 right-4 animate-slide-in">
            <div className={`${getColor()} p-4 rounded-lg shadow-lg flex items-center gap-4`}>
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="hover:opacity-70 transition-opacity text-red-600"
                >
                    x
                </button>
            </div>
        </div>
    );
};

// Хук уведомлений

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);

    const showNotification = (message: string, type: NotificationType) => {
        const newNotification = { message, type, onClose: () => removeNotification(message) };
        setNotifications(prev => [...prev, newNotification]);
    };

    const removeNotification = (message: string) => {
        setNotifications(prev => prev.filter(n => n.message !== message));
    };

    return {
        showNotification,
        Notifications: () => (
            <>
                {notifications.map((props, index) => (
                    <Notification key={index} {...props} />
                ))}
            </>
        )
    };
};