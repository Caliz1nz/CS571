import { Alert, Button, Pressable, Text } from "react-native";
import BadgerCard from "./BadgerCard";
import * as SecureStore from "expo-secure-store";
import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";

function BadgerChatMessage(props) {
  const dt = new Date(props.created);
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const jwt = SecureStore.getItem("token");
    fetch(`https://cs571.org/rest/s25/hw9/whoami`, {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Authorization": `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isLoggedIn) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
          setUsername(data.user.username);
        }
      });
  }, []);

  const deletePost = async () => {
    const jwt = await SecureStore.getItemAsync("token");
    fetch(`https://cs571.org/rest/s25/hw9/messages?id=${props.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Authorization": `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (res.status == 401) {
          Alert.alert("You should login first!");
          throw new Error("Authentication error!");
        } else if (res.status == 404) {
          Alert.alert("That message doesn't exist!");
          throw new Error("Message not found!");
        }
        return res.json();
      })
      .then((data) => {
        props.loadMessages();
        Alert.alert("Alert", "Successfully delete the post!");
      })
      .catch(e => console.log(e));
  };

  return (
    <BadgerCard
      style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}
    >
      <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
      <Text style={{ fontSize: 12 }}>
        by {props.poster} | Posted on {dt.toLocaleDateString()} at{" "}
        {dt.toLocaleTimeString()}
      </Text>
      <Text></Text>
      <Text>{props.content}</Text>
      {isLogin == true && username == props.poster ? (
        <Pressable style={{ backgroundColor: "red", borderRadius: 15, margin: 5 }}>
          <Button title="DELETE POST" color="white" onPress={deletePost} />
        </Pressable>
      ) : (
        ""
      )}
    </BadgerCard>
  );
}

export default BadgerChatMessage;
