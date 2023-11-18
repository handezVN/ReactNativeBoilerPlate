import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from '../../constants/colors';
import {useAppStateContext} from '@app/handlers/AppStateContext';
import {RobotoText} from '@app/components/RobotoText/RobotoText';

const UsersScreen = () => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const {isConnected} = useAppStateContext();
  useEffect(() => {
    console.log('isConnected', isConnected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView>
      <RobotoText style={{color: Colors.text}}>UsersScreen</RobotoText>
    </SafeAreaView>
  );
};

export default UsersScreen;
