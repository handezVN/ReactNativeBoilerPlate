import {createNativeStackNavigator} from "@react-navigation/native-stack"
import UsersScreen from "../screens/UsersScreen"
import {useTranslation} from "react-i18next"

const Stack = createNativeStackNavigator()

const UserStackNavigation = () => {
    const {t} = useTranslation()

    return (
        <Stack.Navigator
            id="UserNavigation"
            initialRouteName="Users"
            screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default UserStackNavigation
