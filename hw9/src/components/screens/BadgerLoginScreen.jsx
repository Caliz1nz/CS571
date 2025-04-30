import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
          <Button
            color="crimson"
            title="Login"
            onPress={(e) => {
              e?.preventDefault();
              props.handleLogin(username, pin);
            }}
          />
          <Text>New here?</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Button
              color="grey"
              title="SIGNUP"
              onPress={() => props.setIsRegistering(true)}
            />
            <Button
              color="grey"
              title="CONTINUE AS A GUEST"
              onPress={() => props.setIsGuest(true)}
            />
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
