import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

function BadgerLoginScreen(props) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 20, textAlign: "center" }}>
        BadgerChat Login
      </Text>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ textAlign: "center" }}>Username</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={username}
            onChangeText={(t) => setUsername(t)}
          />
          <Text style={{ textAlign: "center" }}>PIN</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="number-pad"
            secureTextEntry={true}
            maxLength={7}
            value={pin}
            onChangeText={(t) => setPin(t)}
          />
          <Pressable style={{ backgroundColor: "crimson", margin:5, borderRadius: 10 }}>
            <Button
            title="Login"
            color="white"
            onPress={(e) => {
              e?.preventDefault();
              props.handleLogin(username, pin);
            }}
          />
          </Pressable>
          <Text>New here?</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flex: 1,
              flexDirection: "row",
              columnGap: 10,
              margin: 5
            }}
          >
            <Pressable style={{ backgroundColor: "grey", borderRadius: 20 }}>
            <Button
              color="white"
              title="SIGNUP"
              onPress={() => props.setIsRegistering(true)}
            />
            </Pressable>
            <Pressable style={{ backgroundColor: "grey", borderRadius: 20 }}>
            <Button
              color="white"
              title="CONTINUE AS A GUEST"
              onPress={() => {
                props.setIsGuest(true);
                SecureStore.deleteItemAsync("token");
              }}
            />
            </Pressable>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: 100,
  },
  input: {
    height: 40,
    width: 100,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default BadgerLoginScreen;
