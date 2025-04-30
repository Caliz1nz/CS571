import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import CS571 from "@cs571/mobile-client";
import * as SecureStore from "expo-secure-store";
import BadgerChatroomScreen from "./screens/BadgerChatroomScreen";
import BadgerRegisterScreen from "./screens/BadgerRegisterScreen";
import BadgerLoginScreen from "./screens/BadgerLoginScreen";
import BadgerLandingScreen from "./screens/BadgerLandingScreen";
import { Alert } from "react-native";

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    fetch(`https://cs571.org/rest/s25/hw9/chatrooms`, {
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
    .then(res => {
      if(res.status == 200 || res.status == 304){
        return res.json();
      }
      throw new Error("Cannot get the classrooms")
    })
    .then(data => {
      setChatrooms(data);
    })
    .catch(e => console.log(e))
  }, []);

  function handleLogin(username, pin) {
     if(checkUsernameAndPin(username, pin))
      {
      fetch(`https://cs571.org/rest/s25/hw9/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          pin: pin,
        }),
      })
        .then((res) => {
          if (res.status == 401) {
            setIsLoggedIn(false); 
            Alert.alert("That username or pin is incorrect!");
            throw new Error("Incorrect username or pin!");
          }
          return res.json();
        })
        .then((data) => {
          SecureStore.setItemAsync("token", data.token);
          SecureStore.setItemAsync("username", data.user.username);
          setIsLoggedIn(true);
          Alert.alert("Successfully authentication!");
        })
        .catch((e) => console.log(e));
    }
  }

  function handleSignup(username, pin, repeatPin) {
    if(repeatPin == "" || repeatPin != pin){
      Alert.alert("pins do not match");
    }
    else if(checkUsernameAndPin(username, pin)){
      fetch(`https://cs571.org/rest/s25/hw9/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          pin: pin
        }),
      })
      .then(res => {
        if(res.status == 409){
          Alert.alert("The user already exists");
          throw new Error("Duplicated user");
        } else if(res.status == 413){
          Alert.alert("username must be 64 characters or fewer");
          throw new Error("Bad username");
        }
        return res.json();
      })
      .then(data => {
        setIsLoggedIn(true);
        SecureStore.setItemAsync("token", data.token);
        Alert.alert("Successful registration!")
      })
      .catch(e => console.log(e));
    }
  }

  const checkUsernameAndPin = (username, pin) => {
    const lenRegex = /^\d{7}$/;
    if (
      username.length == 0 ||
      pin.length == 0
    ) {
      Alert.alert("Please enter the username or pin");
      return false;
    } else if(!lenRegex.test(pin)) {
      Alert.alert("A pin must be 7 digits")
      return false;
    }
    return true;
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map((chatroom) => {
            return (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            );
          })}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else {
    return (
      <BadgerLoginScreen
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        setIsGuest={setIsGuest}
      />
    );
  }
}
