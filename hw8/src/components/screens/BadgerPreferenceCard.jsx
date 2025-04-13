import { useContext, useMemo, useState } from "react";
import { Text, Switch, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import BadgerTagsContext from "../context/BadgerTagsContext";
import BadgerPreferencesContext from "../context/BadgerPreferencesContext";

export default function BadgerPreferenceCard(props) {

    const cardWidth = useMemo(() => Dimensions.get("window").width*0.95, []);
    const cardHeight = useMemo(() => Dimensions.get("window").height*0.07, [])
    const [tag, setTag] = useContext(BadgerTagsContext);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);
    const [isOn, setIsOn] = useState(true);

    const handlePress = (val) => {
        setIsOn(() => val);
        if(!val){
            let newTag = tag.filter(t => {
                if(t != props.name){
                    return true;
                }
                return false;
            });
            setTag(newTag);
        }else{
            let newTag = [...tag];
            newTag.push(props.name);
            setTag(newTag);
        }
    }

    return <Card style={{width: cardWidth, height: cardHeight}}>
        <Text style={{fontSize: 17, fontWeight: "500", textAlign: "center", margin: 3}}>Currently showing <Text style={{fontSize: 19, fontWeight: "600"}}>{props.name}</Text> articles</Text>
        <Switch value={isOn} onValueChange={handlePress} style={{alignSelf: "center"}} />
    </Card>
}