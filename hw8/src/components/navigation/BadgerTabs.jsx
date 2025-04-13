import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen.jsx"
import BadgerNewsStack from "./BadgerNewsStack.jsx";
import { useState } from "react";
import BadgerTagsContext from "../context/BadgerTagsContext.js"


const Tab = createBottomTabNavigator();

function BadgerTabs(props) {

    const [tag, setTag] = useState([]);

    return <>
        <BadgerTagsContext.Provider value={[tag, setTag]}>
            <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'News') {
                iconName = "newspaper-outline";
                } else if (route.name === 'Preferences') {
                iconName = "settings-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
            })}
            >
                    <Tab.Screen name="News" options={{headerTitle: "Articles", headerShown: false}} component={BadgerNewsStack} />
                    <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
            </Tab.Navigator>
        </BadgerTagsContext.Provider>
    </>
}

export default BadgerTabs;