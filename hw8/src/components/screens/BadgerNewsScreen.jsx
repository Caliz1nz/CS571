import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CS571 from "@cs571/mobile-client"
import BadgerNewsCard from "./BadgerNewsCard";
import BadgerPreferencesContext from "../context/BadgerPreferencesContext";
import BadgerTagsContext from "../context/BadgerTagsContext";


function BadgerNewsScreen(props) {

    const [news, setNews] = useState([]);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);
    const [tag, setTag] = useContext(BadgerTagsContext);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw8/articles", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(json => {
            setNews(json);
            let tags = [];
            for(j of json){
                for(t of j.tags){
                    if(!tags.includes(t)){
                        tags.push(t);
                    }
                }
            }
            setPrefs(tags);
            setTag(tags);
        });
    }, []);


    return <View>
        <ScrollView>
            {news.length > 0 ? news.filter(n => {
                for(let t of n.tags){
                    if(!tag.includes(t)){
                        return false;
                    }
                }
                return true;
            })
            .map(n => {
                return <BadgerNewsCard key={n.id} {...n} />
            }) :
            <Text>Still loading...</Text>}
        </ScrollView>
    </View>
}

export default BadgerNewsScreen;