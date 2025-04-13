import CS571 from "@cs571/mobile-client";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { View, Text, Image, ScrollView, Pressable, Dimensions, Animated, Linking, Alert } from "react-native";

export default function BadgerDetailedNews(props) {

    const [article, setArticle] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const params = props.route.params;
    const imgWidth = useMemo(() => Dimensions.get("window").width, []);
    const imgHeight = useMemo(() => (Dimensions.get("window").height) / 4, []);
    const opacityRef = useRef(new Animated.Value(0));
    const widthRef = useRef(new Animated.Value(0));
    const heightRef = useRef(new Animated.Value(0));

    useEffect(() => {
        fetch(`https://cs571.org/rest/s25/hw8/article?id=${params.articleId}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(json => {
            setArticle(json);
            setIsLoad(true);
        })
    }, [])

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(widthRef.current, {
                    toValue: imgWidth,
                    duration: 5000,
                    useNativeDriver: false
                }),
                Animated.timing(heightRef.current, {
                    toValue: imgHeight,
                    duration: 5000,
                    useNativeDriver: false
                })
            ]),
            Animated.timing(opacityRef.current, {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true
        })
    ]).start()
    }, []);

    const handleOpenURL = useCallback(async () => {
        const support = await Linking.canOpenURL("https://news.wisc.edu/");
        if(support){
            await Linking.openURL("https://news.wisc.edu/");
        }else{
            Alert.alert("Cannot open this URL!");
        }
    }, [])


    return <View>
        {isLoad ? 
        <ScrollView>
            <Animated.Image source={{uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}`}} style={{width: widthRef.current, height: heightRef.current}} />
            <Text style={{fontSize: 28, fontWeight: "700", margin: 7}}>{article.title}</Text>
            <Text style={{fontSize: 25, fontWeight: "600", margin: 7}}>{`By ${article.author} on ${article.posted}`}</Text>
            <Pressable onPress={handleOpenURL}>
                <Text style={{fontSize: 25, color: "skyblue", marginLeft: 7, marginBottom: 10}}>Read full article here.</Text>
            </Pressable>
            <Animated.Text style={{fontSize: 23, fontWeight: "600", margin: 7, opacity: opacityRef.current}}>
                {article.body}
            </Animated.Text>
        </ScrollView> :
        <Text>The content is loading!</Text>}
    </View>
}