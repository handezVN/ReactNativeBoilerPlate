import {SafeAreaView, View, FlatList} from 'react-native';
import globalStyles from '../../constants/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../store/settingSlice';
import ItemWithIcon from '../../components/ItemWithIcon';
import {useTranslation} from 'react-i18next';
import {setValueInAsyncStorage} from '../../utils/asyncStorage';
import {useTheme} from '@react-navigation/native';
import {globalStore} from '../../store/store';
import {DarkMode, LightMode} from '../../constants/colors';

const ThemesScreen = ({navigation}: any) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const dispatch = useDispatch();
  const {themes} = useSelector((state: globalStore) => state.settings);

  return (
    <SafeAreaView>
      <View style={globalStyles.containerPadding16Style}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={themes}
          renderItem={({item, index}) => (
            <ItemWithIcon
              backgroundColor={Colors.card}
              textColor={Colors.text}
              text={item.name}
              iconName={
                item.selected ? 'checkmark-circle' : 'checkmark-circle-outline'
              }
              onPress={() => {
                dispatch(setTheme(item.code));
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
