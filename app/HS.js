import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './components/BottomNavBar';




const ChallengeScreen = () => {
    const navigation = useNavigation();
    const [activePage, setActivePage] = useState(''); 
    const [showSearchBar, setShowSearchBar] = useState(false);
    

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
            {activePage === '發起挑戰' ? (
                <SafeAreaView style={styles.sCContainer}>
                <View style={styles.sCHeader}>
                    <TouchableOpacity onPress={() => setActivePage('')}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    {!showSearchBar && (
                        <Text style={styles.sCHeaderText}>發起挑戰</Text>
                    )}
                    <TouchableOpacity style={styles.searchButtonContainer} onPress={() => setShowSearchBar(!showSearchBar)}>
                        <Text style={styles.searchButton}>🔍</Text>
                    </TouchableOpacity>
                    
                </View>
                {showSearchBar && (
                    <View style={styles.searchBarOverlay}>
                        <TextInput 
                        style={styles.searchInput} 
                        placeholder="Search..."
                        placeholderTextColor="#aaa"
                        
                        />
                    </View>
                )}
                <ScrollView>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>挑戰名稱</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>挑戰日數</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>挑戰機會</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>每日觀看數量</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>開始日期</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                      right={<TextInput.Icon name="calendar" />}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>結束日期</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                      right={<TextInput.Icon name="calendar" />}
                    />
                  </View>
                
                <TouchableOpacity style={styles.sCConfirmButton}>
                    <Text style={styles.sCConfirmButtonText}>確認</Text>
                </TouchableOpacity>
                </ScrollView>
              </SafeAreaView>
       
    ):(
        <SafeAreaView style={styles.cSContainer}>     
            <View style={styles.cSHeaderContainer}>
                <Text style={styles.cSHeaderText}>挑戰</Text>
                <TouchableOpacity style={styles.cSHeaderButton}
                    onPress={() => setActivePage('發起挑戰')
                }>
                    <Text style={styles.cSHeaderButtonText}>發起挑戰</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cSCardContainer}>
                <Card  title="接受挑戰" count="6"/>
                <Card  title="進行中挑戰" count="12" />
                <Card  title="已完成挑戰" count="14"/>
                <Card  title="已發起挑戰" count="6" />
            </View>      
        </SafeAreaView>
            
    )}
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
    sCContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5F5F5',
    },
    sCHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 18,
    },
    backButton: {
      fontSize: 24,
      color: '#48bcbc',
    },
    searchButtonContainer: {
       zIndex:0,
      },
    searchButton: {
      fontSize: 24,
      color: '#48bcbc',
    },
    sCHeaderText: {
      textAlign: 'center',
      color: '#48bcbc',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    searchBarOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: 120, // Adjust this value to leave space for the back button
      paddingTop: 28, // Adjust this value if needed to align the search bar with the header
      backgroundColor: '#F5F5F5',
      paddingRight: 20,
      zIndex: -1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 4,
      fontSize: 16,
      color: '#000',
     
    },
    input: {
      backgroundColor: '#FFF',
      flex: 1,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#EEF1F4',
        height: 45,
        borderWidth: 0, // Remove border width to avoid the line
        borderBottomWidth: 0, // Ensure bottom border is removed
        borderRadius: 20, // Apply high border radius for rounded corners
        borderColor: 'transparent', // Set border color to transparent
        paddingLeft: 20,
        paddingRight: 40, // Add padding to the right to make space for the icon
    },

    sCConfirmButton: {
      backgroundColor: '#48bcbc',
      width: '80%',
      height: '6.5%',
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    sCConfirmButtonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
    },
    cSHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 18,
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
      color: '#48bcbc',
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
      color: '#48bcbc',
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

