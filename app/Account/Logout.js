import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Logout() {
    const [login_id, setlogin_id] = useState('');
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const Login = async (login_id,password) => {
        try {
            console.log(login_id)
            console.log(password)
            let formdata = new FormData();
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
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.warn(error);
        }
    };
    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={40} color="#00A3A3" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.logocontainer}>
                        <Image source={require('../pictures/JCBLP_logo.cbf23730.png')} style={styles.logo} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>User Name</Text>
                        <TextInput
                            style={styles.input}
                            value={login_id}
                            onChangeText={setlogin_id}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.pwinput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.forgotpwcontainer}>
                        <TouchableOpacity>
                        <Text style={{textAlign:'right'}}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={()=>(Login(login_id,password))}>
                        <Text style={styles.confirmButtonText}>確認</Text>
                    </TouchableOpacity>


                    
                    <View style={styles.createaccontainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={{textAlign:'right'}}>create account</Text>
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
