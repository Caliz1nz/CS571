import { Alert, Button, Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";
import BadgerItemContext from "../context/BadgerItemContext";

export default function BadgerMart(props) {

    const [items, setItems] = useState([]);
    const [nowItem, setNowItem] = useState(1);
    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
    const [thirdCount, setThirdCount] = useState(0);


    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => {
            if(res.status == 200){
                return res.json();
            }
            throw new Error();
        })
        .then(data => {
            setItems(data);
        })
        .catch(e => console.log(e));
    }, [])

    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Button title="Previous" onPress={() => setNowItem(nowItem - 1)} disabled={nowItem === 1 ? true : false}></Button>
            <Button title="Next" onPress={() => setNowItem(nowItem + 1)} disabled={nowItem === 3 ? true : false}></Button>
        </View>
                {nowItem === 1 ?
                <BadgerItemContext.Provider value={[firstCount, setFirstCount]}>
                    <BadgerSaleItem {...items[0]}/>
                </BadgerItemContext.Provider> 
                 : ""}
                {nowItem === 2 ?
                <BadgerItemContext.Provider value={[secondCount, setSecondCount]}>
                    <BadgerSaleItem {...items[1]}/>
                </BadgerItemContext.Provider> 
                 : ""}
                {nowItem === 3 ? 
                <BadgerItemContext.Provider value={[thirdCount, setThirdCount]}>
                    <BadgerSaleItem {...items[2]}/>
                </BadgerItemContext.Provider> 
                 : ""}
                {items.length > 0 ?
                <Text>
                    {`You have ${firstCount + secondCount + thirdCount} item(s) costing ${(firstCount*(items[0].price) + secondCount*(items[1].price) + thirdCount*(items[2].price)).toFixed(2)} in your cart.`}
                </Text> :
                <Text>No data yet!</Text>
                }
                <Button title="PLACE ORDER" onPress={() => Alert.alert("Order Confirmed!", `Your order contains ${firstCount + secondCount + thirdCount} items and costs $${(firstCount*items[0].price + secondCount*items[1].price + thirdCount*items[2].price).toFixed(2)}!`)}
                    disabled={firstCount+secondCount+thirdCount == 0 ? true : false}></Button>
        </View>
}