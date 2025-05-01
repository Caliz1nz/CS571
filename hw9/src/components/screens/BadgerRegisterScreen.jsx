import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function BadgerRegisterScreen(props) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [repeatPin, setRepeatPin] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>
        Join BadgerChat!
      </Text>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={username}
            onChangeText={(t) => setUsername(t)}
          />
          <Text>PIN</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="number-pad"
            secureTextEntry={true}
            maxLength={7}
            value={pin}
            onChangeText={(t) => setPin(t)}
          />
          <Text>Confirm PIN</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            autoCapitalize="none"
            secureTextEntry={true}
            maxLength={7}
            value={repeatPin}
            onChangeText={(t) => setRepeatPin(t)}
          />
          {pin == "" ? (
            <Text style={{ color: "red" }}>Please enter a pin</Text>
          ) : /^\d{7}$/.test(pin) ? (
            pin == repeatPin ? (
              ""
            ) : (
              <Text style={{ color: "red" }}>pins do not match</Text>
            )
          ) : (
            <Text style={{ color: "red" }}>a pin must be 7 digits</Text>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              columnGap: 10
            }}
          >
            <Pressable style={{ backgroundColor: "crimson", borderRadius: 20 }}>
            <Button
              color="white"
              title="SIGNUP"
              onPress={() => props.handleSignup(username, pin, repeatPin)}
            />
            </Pressable>
            <Pressable style={{ backgroundColor: "grey", borderRadius: 20 }}>
            <Button
              color="white"
              title="NEVERMIND!"
              onPress={() => props.setIsRegistering(false)}
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

export default BadgerRegisterScreen;
