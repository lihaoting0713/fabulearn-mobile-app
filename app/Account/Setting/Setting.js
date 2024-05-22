import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, Octicons, SimpleLineIcons, Feather, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Setting({ }) {
    const navigation = useNavigation();
    const [isWifiOnly, setIsWifiOnly] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const otherslist = [
        { text: '只許wifi下播放影片', id: "wifi", value: isWifiOnly, set: setIsWifiOnly },
        { text: '通知彈出', id: "notification", value: isNotification, set: setIsNotification }
        
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} />
                </TouchableOpacity>
                <Text style={styles.title}>設定</Text>
                <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} opacity={0} />
            </View>
            <View style={styles.basic}>
                <Text style={styles.sectiontitle}>基本</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AccountSetting')}>
                <View style={styles.accountcontainer}>
                    <Text style={styles.accounttext}>帳戶</Text>
                    <Octicons name="chevron-right" size={30} color="grey" />
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Password')} >
                <View style={styles.accountcontainer}>
                    <Text style={styles.accounttext}>密碼</Text>
                    <Octicons name="chevron-right" size={30} color="grey" />
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.others}>
                <Text style={styles.sectiontitle}>其他</Text>
                <FlatList
                    data={otherslist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                            <Switch value={item.value} onValueChange={(newValue) => {console.log(newValue);item.set(newValue)}} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FFFE',
    },
    top: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    backpage: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00A3A3',
        flex: 1,
        textAlignVertical: 'center',
    },
    sectiontitle: {
        fontSize: 20,
        color: '#00A3A3',
        marginVertical: 20,
        marginHorizontal: 20,
        fontWeight: 'bold',
    },
    basic: {

    },
    accountcontainer: {
        color: 'grey',
        marginHorizontal: 20,
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        paddingHorizontal:20,
    },
    accounttext: {
        color: 'grey',
        fontSize: 18,
    },
    others: {
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        height: 50,
        paddingHorizontal:20,
    },
    text: {
        fontSize: 18,
        color: 'grey',
    },
});

export default Setting;
