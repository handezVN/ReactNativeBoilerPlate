/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import UserStackNavigation from './UserStackNavigation';
import SettingsStackNavigation from './SettingsStackNavigation';
import {DarkMode, LightMode} from '../constants/colors';

const Tab = createBottomTabNavigator();

const HomeBottomNavigation = () => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      id="BottomNavigation"
      initialRouteName="Users"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'UsersStack') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'SettingsStack') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Feedback') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'apps' : 'apps-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="UsersStack"
        component={UserStackNavigation}
        options={{headerShown: false, title: `${t('users')}`}}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackNavigation}
        options={{headerShown: false, title: `${t('settings')}`}}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
