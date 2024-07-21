import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function AccountSetting() {
    let usericon = "../../pictures/test-user-icon.34017c5c.png";
    const [userName, setUserName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [schoolfaculty, setSchoolFaculty] = useState('');
    const [phone, setPhone] = useState('');
    const [summary, setSummary] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={40} color="#00A3A3" />
                        </TouchableOpacity>
                        <Text style={styles.title}>帳戶</Text>
                        <View style={{ width: 40}} />
                    </View>
                    <View>
                    <Image source={require(usericon)} style={styles.usericon} />
                    <View style={styles.editIconContainer}>
                        <TouchableOpacity>
                        <MaterialIcons name="edit" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>User Name</Text>
                        <TextInput
                            style={styles.input}
                            value={userName}
                            onChangeText={setUserName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>mail</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
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
    title: {
        fontSize: 20,
        color: '#00A3A3',
        fontWeight: 'bold',
    },
    usericon: {
        width: 150,
        height: 150,
        borderRadius: 50,
        shadowColor: '#00A3A3',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: 'white',
        borderRadius: 100,
    },
    editIconContainer: {
        backgroundColor: '#00A3A3',
        borderRadius: 30,
        padding: 6,
        position: 'absolute',
        top: 100,
        left: 100,
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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
});

export default AccountSetting;
