import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function BadgerRegisterScreen(props) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [repeatPin, setRepeatPin] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 12 }}>Join BadgerChat!</Text>
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              bottom: 280,
            }}
          >
            <Button
              color="crimson"
              title="Signup"
              onPress={() => props.handleSignup(username, pin)}
            />
            <Button
              color="grey"
              title="NEVERMIND!"
              onPress={() => props.setIsRegistering(false)}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
