import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

function Logout() {
    const [login_id, setlogin_id] = useState('');
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginfailed, setLoginFailed] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const Login = async (login_id,password) => {
        try {
            console.log(login_id)
            console.log(password)
            const formdata = new FormData();
            formdata.append("login_id", login_id);
            formdata.append("password", password);
            const url = "https://schools.fabulearn.net/api/login";
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "multipart/form-data;"
            },
            body: formdata
            });
            const testpannelresponse = await fetch("http://192.168.18.12/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': "multipart/form-data;"
                },
                body: formdata
            });
            const data = await response.json();
            console.log(data);
            const testpanneldata = await testpannelresponse.json();
            console.log(testpanneldata);
            setlogin_id('');
            setPassword('');
            if(data.success === true){
                console.log("login success")
                let logindata = {
                    login_id: login_id,
                    password: password
                }
                console.log("logindata:",logindata)
                await storelogin(JSON.stringify(logindata));
                console.log("login status: ",await SecureStore.getItemAsync("Logined"))
                if(await getStoredTabID()==null){
                    const tabID = generateRandomInteger();
                    console.log("generated:",tabID)
                    await storeTabID(tabID);
                    console.log("generated new tabID: ",await getStoredTabID())
                }
                else{
                    console.log("tabID already exists: ",await getStoredTabID())
                }
                navigation.navigate('AccountScreen');
                navigation.navigate('HomeScreen');
            }
            else{
                console.log("login failed")
                setLoginFailed(true);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const generateRandomInteger = () => {
        return Math.floor(Math.random() * 1000000);
    };

    async function storeTabID(value) {
        await SecureStore.setItemAsync("tabID", value.toString());
    }

    async function storelogin(data) {
        await SecureStore.setItemAsync("Logined", data);
        await SecureStore.setItemAsync("isLogin", "true");
    }
      
    async function getStoredTabID() {
        const result = await SecureStore.getItemAsync("tabID");
        if (result) {
          return result;
        } else {
          console.log('No values stored under that key.');
          return null;
        }
    }
    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.topBar}>
                        {/*<TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={40} color="#00A3A3" />
                        </TouchableOpacity>*/}
                    </View>

                    <View style={styles.logocontainer}>
                        <Image source={require('../pictures/JCBLP_logo.cbf23730.png')} style={styles.logo} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>User Name</Text>
                        <TextInput
                        autoCapitalize='none'
                            style={styles.input}
                            value={login_id}
                            onChangeText={setlogin_id}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                            autoCapitalize='none'
                                style={styles.pwinput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.forgotpwcontainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
                        <Text style={{textAlign:'right'}}>忘記密碼</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={()=>{
                        Login(login_id,password)
                    }}>
                        <Text style={styles.confirmButtonText}>確認</Text>
                    </TouchableOpacity>


                    
                    <View style={styles.createaccontainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={{textAlign:'right'}}>創建帳號</Text>
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
        width: '100%',
        backgroundColor: '#F7FFFE',

    },
    scroll: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        flexGrow: 1,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    logocontainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
    },
    logo: {
        width: 200,
        height: 100,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    pwinput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    forgotpwcontainer: {
        width: '100%',
        marginTop: 15,
    },
    confirmButton: {
        top: 100,
        width: '100%',
        height: 50,
        backgroundColor: '#00A3A3',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createaccontainer: {
        top: 110,
        bottom: 75,
        width: '100%',
    },
});

export default Logout;
