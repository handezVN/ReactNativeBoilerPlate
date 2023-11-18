import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import {useAppState} from '../hooks/useAppState';

// Tạo một interface cho trạng thái ứng dụng
interface AppState {
  isConnected: boolean;
  // Thêm các trạng thái khác nếu cần
}

// Khởi tạo context cho trạng thái ứng dụng
const AppContext = createContext<AppState>({
  isConnected: false,
  // Khởi tạo các trạng thái khác nếu cần
});

// Provider để cung cấp trạng thái cho các thành phần con
export const AppStateProvider: any = ({children}: any) => {
  const [appState, setAppState] = useState<AppState>({
    isConnected: false,
    // Khởi tạo các trạng thái khác nếu cần
  });

  // Kiểm tra kết nối mạng khi component được mount
  useEffect(() => {
    const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(
      (state: NetInfoState) => {
        setAppState({
          ...appState,
          isConnected: state.isConnected ?? false,
        });
      },
    );

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);
  useAppState({
    onChange: newAppState => {
      console.log('====> App To Change ' + newAppState, 'AppState');
    },

    onForeground: () => {
      console.log({}, 'App To Active');
    },

    onBackground: () => {
      console.log({}, 'App To Background ^^');
    },

    onBackForeground: () => {
      console.log({}, 'App from back To foreground');
    },

    onBackToActive: () => {},
  });
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

// Hook để sử dụng trạng thái ứng dụng trong các thành phần con
export const useAppStateContext = () => useContext(AppContext);
