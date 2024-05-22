import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons, SimpleLineIcons, Feather, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function AboutApp() {
    const navigation = useNavigation();
    let text = "挑戰1﹕10日數學自習惶發思行王偶憫3斜斜2億5𠂇5快怩心個心態忄衤忄p3比值得愜到你怎要就寢個心態忄衤忄p3比值得愜到你怎要就寢個心態忄衤忄p3比值得愜到你怎要就寢個心態忄衤忄p3比值得愜到你怎要就寢個心態忄衤忄p3比值得愜到你怎要就寢下人哋到长要億壓硤㣺1多p宦年紀你未個未54op5匆險又峌讚佢乾";
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} />
                </TouchableOpacity>
                <Text style={styles.title}>關於App</Text>
                <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} opacity={0} />
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>
                    {text}
                </Text>
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
    content:{
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '90%',
        flex: 0.8,
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 40,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00A3A3',
        textalign: 'center',
        marginTop: 50,
        textAlign: 'left',
    },
});

export default AboutApp;