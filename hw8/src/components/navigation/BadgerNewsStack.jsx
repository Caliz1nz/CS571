import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BadgerNewsScreen from "../screens/BadgerNewsScreen.jsx";
import BadgerDetailedNews from "../screens/BadgerDetailedNews.jsx"

const Stack = createNativeStackNavigator();

export default function BadgerNewsStack() {
    return <Stack.Navigator>
        <Stack.Screen name="Articles" component={BadgerNewsScreen} />
        <Stack.Screen name="Article" component={BadgerDetailedNews} />
    </Stack.Navigator>
}
