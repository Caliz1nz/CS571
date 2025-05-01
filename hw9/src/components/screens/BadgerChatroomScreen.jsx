import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Button,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const loadMessages = () => {
    fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`, {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => {
        if (res.status == 200 || res.status == 304) {
          return res.json();
        }
        throw new Error("Cannot get messages");
      })
      .then((data) => {
        setMsg(data.messages);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const createPost = async () => {
    const jwt = await SecureStore.getItemAsync("token");
    fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        title: titleInput,
        content: bodyInput,
      }),
    })
      .then((res) => {
        if (res.status == 400) {
          Alert.alert("The post must contain a title and a body!");
          throw new Error("Bad request");
        } else if (res.status == 401) {
          Alert.alert("You should login first");
          throw new Error("Authentication error!");
        } else if (res.status == 404) {
          Alert.alert("Something wrong with this classroom!");
          throw new Error("Classroom doesn't exist!");
        } else if (res.status == 413) {
          Alert.alert("Your title should be fewer than 128 characters!");
          throw new Error("Title is too long");
        }
        return res.json();
      })
      .then((data) => {
        setTitleInput("");
        setBodyInput("");
        setModalVisible(false);
        loadMessages();
        Alert.alert("Successfully posted!", "Successfully posted!");
      })
      .catch((e) => console.log(e));
  };

  useEffect(loadMessages, [props]);
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
        }
      });
  }, [isLoading])

  return (
    <View
      style={modalVisible ? styles.container_modalVisible : styles.container}
    >
      {msg == [] ? (
        <Text>Still loading</Text>
      ) : (
        <FlatList
          data={msg}
          renderItem={({ item }) => <BadgerChatMessage {...item} loadMessages={loadMessages} />}
          keyExtractor={(m) => m.id}
          onRefresh={loadMessages}
          refreshing={isLoading}
        />
      )}
      {isLogin == true ? (<Pressable
        style={{ height: 40, backgroundColor: "red", justifyContent: "center" }}
      >
        <Button
          color="white"
          title="ADD POST"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </Pressable>) : ""}
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <ScrollView style={styles.modalView}>
            <Text style={{ fontSize: 25, marginBottom: 20 }}>
              Create A Post
            </Text>
            <Text style={{ fontSize: 25 }}>Title</Text>
            <TextInput
              style={styles.inputTitle}
              onChangeText={(t) => setTitleInput(t)}
            />
            <Text style={{ fontSize: 25 }}>Body</Text>
            <TextInput
              style={styles.inputBody}
              multiline={true}
              onChangeText={(t) => setBodyInput(t)}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 10,
              }}
            >
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 100,
                  backgroundColor: "white",
                }}
              >
                <Button
                  title="CREATE POST"
                  color="grey"
                  onPress={createPost}
                  disabled={titleInput == "" || bodyInput == "" ? true : false}
                />
              </Pressable>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 11,
                  backgroundColor: "grey",
                }}
              >
                <Button
                  title="CANCEL"
                  color="white"
                  onPress={() => setModalVisible(false)}
                />
              </Pressable>
            </View>
          </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_modalVisible: {
    flex: 1,
    opacity: 0.5,
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    padding: 35,
    backgroundColor: "white",
    width: Dimensions.get("screen").width * 0.94,
    opacity: 1,
    top: Dimensions.get("screen").height * 0.3,
    marginBottom: Dimensions.get("screen").height * 0.6,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 100,
    alignSelf: "center",
  },
  inputTitle: {
    height: 40,
    width: Dimensions.get("screen").width * 0.7,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputBody: {
    height: 70,
    width: Dimensions.get("screen").width * 0.7,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default BadgerChatroomScreen;
