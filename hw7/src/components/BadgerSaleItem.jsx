import { useContext } from "react";
import { Text, View, Image, Button } from "react-native";
import BadgerItemContext from "../context/BadgerItemContext";

export default function BadgerSaleItem(props) {

    let [count, setCount] = useContext(BadgerItemContext);

    return <View>
        <Text>I am an item!</Text>
        <Image style={{width: 200, height: 200}} source={{uri: props.imgSrcr}}></Image>
        <Text>{props.name}</Text>
        <Text>${props.price} each</Text>
        <Text>You can order up to {props.upperLimit} unit{props.upperLimit > 1 ? "s" : ""}!</Text>
        <View style={{flexDirection: "row"}}>
            <Button title="-" onPress={() => setCount(count - 1)} disabled={count == 0 ? true : false}></Button>
            <Text>{count}</Text>
            <Button title="+" onPress={() => setCount(count + 1)} disabled={count == props.upperLimit ? true : false}></Button>
        </View>
    </View>
}
