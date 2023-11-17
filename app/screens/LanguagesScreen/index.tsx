import {SafeAreaView, View, FlatList} from "react-native"
import globalStyles from "../../constants/globalStyles"
import {useTranslation} from "react-i18next"
import {setValueInAsyncStorage} from "../../utils/asyncStorage"
import {useTheme} from "@react-navigation/native"
import {DarkMode, LightMode} from "../../constants/colors"
import { LanguageItem, useLanguage } from "../../handlers/LanguageContext"
import ItemWithIcon from "../../components/ItemWithIcon"

const LanguagesScreen = ({navigation}: any) => {
    const {dark} = useTheme()
    const Colors = dark ? DarkMode.colors : LightMode.colors
    const {languages , onSetLanguages} = useLanguage();
    const {i18n} = useTranslation()
    type renderItemProps = {
        item: LanguageItem
        index: number
    }
    const ChangeLangue = async ( {value }:{value: string}) => {
        i18n.changeLanguage(value)
        // change language in store
        onSetLanguages(value);
        // save selected language in AsyncStorage
        setValueInAsyncStorage("selected_language", value)
    }
    const renderItem = ({item, index}: renderItemProps) => {
        return (
            <ItemWithIcon
                backgroundColor={Colors.card}
                textColor={Colors.text}
                text={item.name}
                iconName={
                    item.selected
                        ? "checkmark-circle"
                        : "checkmark-circle-outline"
                }
                onPress={() => {
                    ChangeLangue({value: item.code})
                }}
            />
        )
    }
    return (
        <SafeAreaView>
            <View style={globalStyles.containerPadding16Style}>
                <FlatList
                    data={languages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>
        </SafeAreaView>
    )
}

export default LanguagesScreen
