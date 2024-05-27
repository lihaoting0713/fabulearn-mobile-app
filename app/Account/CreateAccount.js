import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CreateAccount() {
  const [Username, setUsername] = useState("");
  const [mail, setmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={40} color="#00A3A3" />
            </TouchableOpacity>
            <Text style={styles.title}>Create account</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Name</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={Username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>mail</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={mail}
                onChangeText={setmail}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={passwordconfirm}
                onChangeText={setPasswordconfirm}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonscontainer}>
            <TouchableOpacity style={styles.resetButton}>
              <Text style={styles.resetButtonText}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F7FFFE",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  content: {
    alignItems: "center",
    width: "100%",
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    color: "#00A3A3",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  buttonscontainer: {
    width: "100%",
    marginTop: 100,
    flexDirection: "row",
  },
  resetButton: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#fd5c63",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#00A3A3",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateAccount;
