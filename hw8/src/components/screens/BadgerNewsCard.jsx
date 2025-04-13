import { Card } from "react-native-paper"
import { Text, Image, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { useMemo } from "react";


export default function BadgerNewsCard(props) {

    const navigation = useNavigation();
    const imgWidth = useMemo(() => Dimensions.get("window").width*0.95, []);

    const handlePress = () => {
            navigation.push("Article", {
                articleId: props.fullArticleId,
            });
        }

    return <Card style={{padding: 12, marginTop: 16}}>
        <Pressable onPress={handlePress}>
                <Image source={{uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${props.img}`}} style={{width: imgWidth, height: 250}} />
            <Text style={{fontSize: 28, fontWeight: "600"}}>{props.title}</Text>
        </Pressable>
    </Card>
}
