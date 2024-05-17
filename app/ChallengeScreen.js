import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './components/BottomNavBar';


const ChallengeScreen = () => {
    const navigation = useNavigation(); 

    const Card = ({ title, count }) => {
        return (
          <TouchableOpacity style={[styles.cardContainer]}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.iconContainer}>
                    <Text style={styles.cardCount}>{count}</Text>
                </View>
            </View>
                <View style={styles.cardRectangle} />
            
            
          </TouchableOpacity>
        );
      };      

    return (
        <SafeAreaView style={styles.cSContainer}>
            <View style={styles.cSHeaderContainer}>
                <Text style={styles.cSHeaderText}>挑戰</Text>
                <TouchableOpacity style={styles.cSHeaderButton}>
                    <Text style={styles.cSHeaderButtonText}>發起挑戰</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cSCardContainer}>
                <Card  title="接受挑戰" count="6"/>
                <Card  title="進行中挑戰" count="12" />
                <Card  title="已完成挑戰" count="14"/>
                <Card  title="已發起挑戰" count="6" />
            </View>
            <BottomNavBar/>
        </SafeAreaView>
    );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
    cSContainer: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },

    cSHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18 ,
    },

    cSHeaderButton: {
        width: 120, 
        height: 50, 
        backgroundColor: '#48bcbc',
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    cSHeaderButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    cSHeaderText: {
        fontSize: 30,
        color:'#48bcbc',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

    cSCardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },  
    
    cardContainer: {
        borderRadius: 10,
        backgroundColor: '#fffcec',
        padding: 10,
        width: '45%',
        height: '35%',
        marginBottom: 30,
        
         // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 }, // Adjusted for stronger shadow
        shadowOpacity: 0.3, // Adjusted for stronger shadow
        shadowRadius: 10, // Adjusted for stronger shadow
        // Elevation for Android
        elevation: 10,

    },

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardRectangle: {
        width: 64,
        height: 64,
        marginTop: 90,
        marginBottom: 5,
        backgroundColor: '#fff', // Default rectangle color
        alignSelf: 'center',
    },
    
    cardTitle: {
        fontSize: 20,
        color:'#48bcbc',
        fontWeight: 'bold',
        paddingTop: 8,
        flexWrap: 'wrap',
    },

    cardCount: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },

    iconContainer: {
        width: 44, // Adjust the size as needed
        height: 44, // Adjust the size as needed
        backgroundColor: '#F28B82', // Adjust the background color as needed
        borderRadius: 22, // Half of width/height to create a perfect circle
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
        borderWidth: 2, // Optional, adds a border
        borderColor: '#fffcec', // Optional, sets border color
      },
      
      
});

