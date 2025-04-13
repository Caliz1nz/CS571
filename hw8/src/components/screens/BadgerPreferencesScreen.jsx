import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import BadgerPreferencesContext from "../context/BadgerPreferencesContext";
import BadgerPreferenceCard from "./BadgerPreferenceCard.jsx";

function BadgerPreferencesScreen(props) {

    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    return <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, gap: 10}}>
        {
            prefs.map((p, index) => {
                return <BadgerPreferenceCard key={index} name={p} />
            })
        }
    </View>
}

export default BadgerPreferencesScreen;