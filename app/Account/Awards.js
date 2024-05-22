import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Sample data structure for awards
const awards = [
    {
        category: "讚好影片",
        items: [
            { id: 1, type: 'generic', locked: true },
            { id: 2, type: 'generic', locked: true },
            { id: 3, type: 'generic', locked: true },
        ],
    },
    {
        category: "觀看影片 (數學)",
        items: [
            { id: 4, type: 'maths', locked: false },
            { id: 5, type: 'maths', locked: true },
            { id: 6, type: 'maths', locked: true },
        ],
    },
    {
        category: "觀看影片 (英文)",
        items: [
            { id: 7, type: 'eng', locked: false },
            { id: 8, type: 'eng', locked: true },
            { id: 9, type: 'eng', locked: true },
        ],
    },
];

// Function to get the appropriate award icon based on type and locked state
function getAwardIcon(type, locked) {
    const iconSource = locked
        ? require('../pictures/locked.2be24dec.png')
        : null; // Placeholder for unlocked state, replace with actual image when available

    return (
        <View style={[styles.awardIcon]}>
            {locked ? (
                <Image
                    source={iconSource}
                    style={styles.lockedIcon}
                />
            ) : (
                <Text>{type.toUpperCase()}</Text>
            )}
        </View>
    );
}

function Award() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} />
                </TouchableOpacity>
                <Text style={styles.title}>獎章</Text>
                <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} opacity={0} />
            </View>

            <FlatList
                data={awards}
                keyExtractor={(item) => item.category}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{item.category}</Text>
                        <View style={styles.awardsRow}>
                            {item.items.map((award) => (
                                <View key={award.id} style={styles.awardContainer}>
                                    {getAwardIcon(award.type, award.locked)}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
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
    categoryContainer: {
        marginTop: 30,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    awardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },
    awardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    awardIcon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF', // Circle background color
    },
    lockedIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default Award;
