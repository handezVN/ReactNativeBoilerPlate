import {View, Text, SafeAreaView} from 'react-native';
import globalStyles from '../../constants/globalStyles';
import IconicItemWithText from '../../components/IconicItemWithText';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from '../../constants/colors';
import {ThemeItem, useThemes} from '../../handlers/ThemeContext';
import {LanguageItem, useLanguage} from '../../handlers/LanguageContext';

const SettingsScreen = ({navigation}: any) => {
  const {themes} = useThemes();
  const {languages} = useLanguage();
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const {t} = useTranslation();
  const selectedTheme: ThemeItem = themes.find(item => item.selected === true)!;
  const selectedLanguage: LanguageItem = languages.find(
    item => item.selected === true,
  )!;
  return (
    <SafeAreaView>
      <View style={globalStyles.containerPadding16Style}>
        <View style={globalStyles.headerStyle}>
          <Icon name="settings" size={24} color={Colors.text} />
          <Text style={{...globalStyles.headerTextStyle, color: Colors.text}}>
            {t('settings')}
          </Text>
        </View>

        <IconicItemWithText
          backgroundColor={Colors.card}
          textColor={Colors.text}
          leftIconName="color-palette-outline"
          keyText={t('theme')}
          valueText={t([selectedTheme.code])}
          onPress={() => {
            navigation.navigate('Themes');
          }}
        />
        <IconicItemWithText
          backgroundColor={Colors.card}
          textColor={Colors.text}
          leftIconName="language-outline"
          keyText={t('language')}
          valueText={t([selectedLanguage.code])}
          onPress={() => {
            navigation.navigate('Languages');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
