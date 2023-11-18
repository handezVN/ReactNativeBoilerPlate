/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {DarkMode, LightMode} from './constants/colors';
import {Provider, useSelector} from 'react-redux';
import {getValueFromAsyncStorage} from './utils/asyncStorage';
import store, {globalStore} from './store/store';
import Loader from './components/Loader';
import HomeBottomNavigation from './navigations/HomeBottomNavigation';
import SplashScreen from 'react-native-splash-screen';
const LightModeTheme = {
  ...DefaultTheme,
  dark: false,
  ...LightMode,
};

const DarkModeTheme = {
  ...DarkTheme,
  dark: true,
  ...DarkMode,
};
import i18n from './i18n/config';
import {LanguageProvider, useLanguage} from './handlers/LanguageContext';
import {ThemeProvider, useThemes} from './handlers/ThemeContext';
import {AppStateProvider} from './handlers/AppStateContext';
const AppRoot = () => {
  const {onSetTheme, themes} = useThemes();
  const {onSetLanguages} = useLanguage();

  useEffect(() => {
    // get and set user selected theme in store
    async function setSelectedTheme() {
      const selectedTheme = await getValueFromAsyncStorage('selected_theme');
      onSetTheme(selectedTheme ? selectedTheme : 'light');
    }
    // get and set user selected language in store
    async function setSelectedLanguage() {
      const selectedLanguage = await getValueFromAsyncStorage(
        // eslint-disable-next-line quotes
        'selected_language',
      );

      i18n.changeLanguage(selectedLanguage);
      onSetLanguages(selectedLanguage ? selectedLanguage : 'en');
    }
    setSelectedTheme();
    setSelectedLanguage();
    SplashScreen.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {isLoading} = useSelector((state: globalStore) => state.global);

  return (
    <NavigationContainer
      theme={themes[1].selected ? DarkModeTheme : LightModeTheme}>
      <StatusBar
        barStyle={themes[1].selected ? 'light-content' : 'dark-content'}
      />
      <Loader visible={isLoading} />
      <HomeBottomNavigation />
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ThemeProvider>
          <AppStateProvider>
            <AppRoot />
          </AppStateProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
