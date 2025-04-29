import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function BadgerLoginScreen(props) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 20 }}>BadgerChat Login</Text>
      <SafeAreaProvider>
        <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
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
              bottom: 280
            }}
          >
            <Button
              styles={styles.btn}
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

export default BadgerLoginScreen;
