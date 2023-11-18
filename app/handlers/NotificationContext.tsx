import React, {createContext, useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationContextProps {
  showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider: any = ({children}: any) => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('Permission granted');
        try {
          const token = await messaging().getToken();
          console.log('FCM token', token);
        } catch (error) {
          console.log('Error', error);
        }
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Provisional Permission granted');
      } else {
        console.log('Permission denied');
      }
    };

    requestUserPermission();

    const registerAppWithFCM = async () => {
      await messaging().registerDeviceForRemoteMessages();
    };

    registerAppWithFCM();
    messaging().onMessage(async remoteMessage => {
      // Xử lý khi nhận được thông báo từ FCM trong trạng thái đang mở app
      console.log('FCM Message:', remoteMessage);
      // Hiển thị thông báo
      showNotification({
        id: remoteMessage.messageId || Math.random().toString(36).substr(2, 9),
        title: remoteMessage.notification?.title || '',
        message: remoteMessage.notification?.body || '',
      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  const showNotification = (notification: Notification) => {
    // Hiển thị thông báo tại đây (sử dụng các API native)
    // Ví dụ: sử dụng React Native ToastAndroid hoặc các thư viện thông báo
    console.log('Show Notification:', notification);
    // Ví dụ sử dụng ToastAndroid
    // ToastAndroid.showWithGravityAndOffset(notification.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  };

  return (
    <NotificationContext.Provider value={{showNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};
