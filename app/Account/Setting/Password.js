import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Password() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const changePassword = async (password,newpassword,confirmpassword) => {
        try{
            console.log(password,newpassword,confirmpassword)
            const url = 'https://schools.fabulearn.net/api/profile/password';
            const formData = new FormData();
            formData.append('password_old', password);
            formData.append('password_new', newpassword);
            formData.append('password_confirm', confirmpassword);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                alert('密碼更改成功');
            } else {
                alert('密碼更改失敗，請檢查密碼是否正確');
            }
        }
        catch (error) {
            alert('更改密碼時發生錯誤s');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={40} color="#00A3A3" />
                        </TouchableOpacity>
                        <Text style={styles.title}>密碼</Text>
                        <View style={{ width: 40}} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>現有密碼</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>新密碼</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                value={newpassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>確認密碼</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                value={confirmpassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.changeButton} onPress={
                        () => {
                            if (password === '' || newpassword === '' || confirmpassword === '') {
                                alert('請輸入完整資料');
                            } else if (newpassword !== confirmpassword) {
                                alert('新密碼與確認密碼不相符');
                            } else {
                                changePassword(password,newpassword,confirmpassword);
                            }
                        }
                    }>
                        <Text style={styles.changeButtonText}>更改</Text>
                    </TouchableOpacity>

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
    title: {
        fontSize: 20,
        color: '#00A3A3',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
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
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    changeButton: {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        height: 50,
        backgroundColor: '#00A3A3',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Password;
