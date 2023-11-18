import {SafeAreaView, View, FlatList} from 'react-native';
import globalStyles from '../../constants/globalStyles';
import ItemWithIcon from '../../components/ItemWithIcon';
import {setValueInAsyncStorage} from '../../utils/asyncStorage';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from '../../constants/colors';
import {useThemes} from '../../handlers/ThemeContext';

const ThemesScreen = ({}: any) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const {themes, onSetTheme} = useThemes();
  return (
    <SafeAreaView>
      <View style={globalStyles.containerPadding16Style}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={themes}
          renderItem={({item}) => (
            <ItemWithIcon
              backgroundColor={Colors.card}
              textColor={Colors.text}
              text={item.name}
              iconName={
                item.selected ? 'checkmark-circle' : 'checkmark-circle-outline'
              }
              onPress={() => {
                onSetTheme(item.code);
                setValueInAsyncStorage('selected_theme', item.code);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ThemesScreen;
