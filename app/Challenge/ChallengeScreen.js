import React, { useState, useEffect } from 'react';
import { Alert, Modal, Dimensions,  StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width)

const ChallengeScreen = () => {
    const navigation = useNavigation();
    const [activePage, setActivePage] = useState(''); 
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('挑戰者');
    const [backAlertVisible, setBackAlertVisible] = useState(false);


    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);
    

    const Card = ({ title, count, onPress }) => {
        return (
          <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
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

      const handleBackButtonPress = () => {
        setBackAlertVisible(true);
      };
    
      const handleBackAlertConfirm = () => {
        setBackAlertVisible(false);
        setActivePage(''); 
      };

      
      const data = [
        {
          id: 2501,
          name: '小明',
          challenge: '挑戰：10日數學自習',
          details: '限時：1日    10條H/日',
          dateStart: '12 / 12 / 2023',
          dateEnd: '12 / 12 / 2023',
          progress: 70 
        },
        {
          id: 2502,
          name: '小明',
          challenge: '挑戰：10日數學自習',
          details: '限時：1日 10條H/日',
          dateStart: '12 / 12 / 2023',
          dateEnd: '12 / 12 / 2023',
          progress: 50 
        },
        {
          id: 2503,
          name: '小明',
          challenge: '挑戰：10日數學自習',
          details: '限時：1日 10條H/日',
          dateStart: '12 / 12 / 2023',
          dateEnd: '12 / 12 / 2023',
          progress: 30 
        },
        {
          id: 2504,
          name: '小明',
          challenge: '挑戰：10日數學自習',
          details: '限時：1日 10條H/日',
          dateStart: '12 / 12 / 2023',
          dateEnd: '12 / 12 / 2023',
          progress: 90 
        }
      ];
      

      const renderContent = () => {
        return (
            <SafeAreaView style={styles.cSContainer}>     
                <View style={styles.cSHeaderContainer}>
                    <Text style={styles.cSHeaderText}>挑戰</Text>
                    <TouchableOpacity style={styles.cSHeaderButton}
                        onPress={() => navigation.navigate('StartChallenge0')
                    }>
                        <Text style={styles.cSHeaderButtonText}>發起挑戰</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cSCardContainer}>
                    <Card  title="接受挑戰"  onPress={() => navigation.navigate('AcceptChallenge')} count="6"/>
                    <Card  title="進行中挑戰" onPress={() => navigation.navigate('ContinuingChallenge')} count="12" />
                    <Card  title="已完成挑戰" onPress={() => navigation.navigate('FinishedChallenge')}count="14"/>
                    <Card  title="已發起挑戰" onPress={() => navigation.navigate('StartedChallenge')}count="6" />
                </View>      
            </SafeAreaView>
        );
        
      };

    return (
        <SafeAreaView style={styles.cSContainer}>
            <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            enableOnAndroid={true}
            extraHeight={Platform.select({ ios: 20, android: 0 })}
            extraScrollHeight={Platform.select({ ios: 20, android: -600 })}
            keyboardOpeningTime={0}
            enableAutomaticScroll={Platform.select({ ios: true, android: true })}
            >
              {renderContent()}
       
            {!isKeyboardVisible && <BottomNavBar />}
        
            </KeyboardAwareScrollView>
       
        </SafeAreaView>
    
    );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
    cSContainer: {
      flex: 1,
      backgroundColor: '#f5f5f7',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    sCContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: '#ffffff',
    },
    sCHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 18,
      width: '100%',
    },  
    sCSearchButton: {
        fontSize: 24,
        color: '#48bcbc',
    },
    sCBackButton: {
      fontSize: 24,
      color: '#48bcbc',
    },
    aCBackButton: {
        fontSize: 24,
        color: '#48bcbc',
      },
    
    sCSearchButtonContainer: {
        zIndex: 2,
        position: 'absolute',
        right: 5, 
    },
    aCSearchButtonContainer1: {
        zIndex: 2,
        position: 'absolute',
        right: 55, 
    },
    
    aCSearchButton: {
      fontSize: 24,
      color: '#48bcbc',
    },
    
    aCSearchFilterContainer: {
        zIndex:-1,
        marginRight: -5
    },
   
    aCFilterIcon:{
        color:"#00A3A3",
    },

    sCHeaderText: {
      textAlign: 'center',
      color: '#48bcbc',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    sCSearchBarOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: 60, // Adjust this value to leave space for the back button
      paddingTop: 13, // Adjust this value if needed to align the search bar with the header
      backgroundColor: '#ffffff', 
      zIndex: -1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    aCSearchBarOverlay1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: 120, // Adjust this value to leave space for the back button
        paddingTop: 13, // Adjust this value if needed to align the search bar with the header
        backgroundColor: '#F5F5F5',
        paddingRight: 50,
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      
    sCScrollViewContent: {
        paddingBottom: 140,
        backgroundColor:'#fffcfc',     
    },
    aCScrollViewContent1: {
        paddingBottom: 140,
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
        height: 45,
        borderWidth: 1, // Reduce border width to make it thinner
        borderRadius: 10, // Apply border radius to the input
        borderColor: '#48bcbc', // Border color to match the theme
        paddingLeft: 10,
    },
    sCSearchInput: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        height: 45,
        borderWidth: 0, // Remove border width to avoid the line
        borderBottomWidth: 0, // Ensure bottom border is removed
        borderRadius: 20, // Apply high border radius for rounded corners
        borderColor: 'transparent', // Set border color to transparent
        paddingLeft: 20,
        paddingRight: 30, // Add padding to the right to make space for the icon
    },
    aCSearchInput: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        height: 45,
        borderWidth: 0, // Remove border width to avoid the line
        borderBottomWidth: 0, // Ensure bottom border is removed
        borderRadius: 20, // Apply high border radius for rounded corners
        borderColor: 'transparent', // Set border color to transparent
        paddingLeft: 20,
        paddingRight: 30, // Add padding to the right to make space for the icon
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
    aCPageContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    aCHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        width: '100%',
      },  
    
    aCHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
      },
    
    aCCardContainer: {
        paddingBottom: 500,
    },
   
    aCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: width * 0.91,
        alignSelf:'center',
    },
    
    aCCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,     
    },
    

    aCCardTitle1: {
        marginRight: 20,
        flexDirection: 'column',  // Keep column to stack vertically
        alignItems: 'center',  // Center horizontally
        width: '18%',       
    },
    
    aCProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginTop:10,
   },
    
    aCCardTitle2: {
        marginRight: 20,
        flexDirection: 'column',  // Keep column to stack vertically
        alignItems: 'flex-start',  // Center horizontall             
    },
    
    aCTitle: {
        fontSize: 16,
        fontWeight: 'bold',    
    },
    aCTitleSmall: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    aCSubtitle: {
        fontSize: 14,
        color: '#555',
        padding: 5,
    },   
    aCSubtitleSmall: {
        fontSize: 13,
        color: '#555',
        padding: 5,
    },   
    aCDetails: {
        fontSize: 12,
        color: '#777',
        padding: 5,
    },
    aCDetailsSmall: {
        fontSize: 11,
        color: '#777',
        padding: 5,
    },
    aCChancesContainer: {
        position: 'absolute',
        top: 20,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    aCChancesText: {
        fontSize: 13,
        color: '#555',
        marginRight: 5,
    },
    aCChancesTextSmall: {
        fontSize: 12,
        color: '#555',
        marginRight: 5,
    },
    aCHeartsContainer: {
        flexDirection: 'row',
        width: '19%',
    },
    aCHeartIcon: {
        width: 18,
        height: 16,
        marginLeft:2,
    },   
    aCHeartIconSmall: {
        width: 15,
        height: 13,
        marginLeft:2,
    },  
    aCCardActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: -40,
        marginTop: -5,
        marginBottom: 10,
    },
    aCRejectButton: {
        backgroundColor: '#FF6F61',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 35,
        marginRight:5,
        
    },
    aCDetailsButton: {
        backgroundColor: '#4DB6AC',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft:5,
    },
    
    aCButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        
      },
      filterOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
      },
      filterOption: {
        fontSize: 16,
        padding: 10,
        color: 'black',
      },
      selectedFilterOption: {
        color: 'blue',
        fontWeight: 'bold',
      },
  
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      cancelButton: {
        backgroundColor: '#f88c8c',
        padding: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
      },
      confirmButton: {
        backgroundColor: '#48bcbc',
        padding: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      backAlertContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      closeButtonText: {
        fontSize: 18,
        color: '#aaa',
      },
      backAlertText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
      },

    cCHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },

    cCScrollViewContent: {
        paddingBottom: 140,
    },

    cCCardContainer: {
        paddingBottom: 500,
    },

    cCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: width * 0.9,
        alignSelf: 'center',
      },
      cCHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        width: '100%',
      },  
      cCCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
      },
      cCCardTitle1: {
        marginRight: 20,
        flexDirection: 'column',
        alignItems: 'center',
      },
      cCTitle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      cCProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginTop: 10,
      },
      cCProfileImageSmall: {
        width: 35,
        height: 35,
        borderRadius: 25,
        marginTop: 10,
      },
      cCCardTitle2: {
        marginRight: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 15,
      },
      cCSubtitle: {
        fontSize: 14,
        color: '#555',
        padding: 5,
      },
      cCSubtitleSmall: {
        fontSize: 13,
        color: '#555',
        padding: 5,
      },
      cCDetails: {
        fontSize: 12,
        color: '#777',
        padding: 5,
      },
      cCDetailsSmall: {
        fontSize: 11,
        color: '#777',
        padding: 5,
      },
      cCDate: {
        fontSize: 12,
        color: '#777',
        padding: 5,
      },
      cCProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        marginBottom:-15,
        marginLeft: 5,
        //paddingLeft:90,
      },
    cCProgressBar: {
        flex: 1,
        height: 15,
        backgroundColor: '#feffff',
        marginRight: 20,
        borderColor:'#e2e2e0',
        borderWidth: 0.5,
    },
    cCProgress: {
        height: '100%',
        backgroundColor: '#69cccc',
        borderColor:'grey',
    },
    cCProgressText: {
        fontSize: 30,
        color: '#69cccc',
        fontWeight: 'bold',
        marginRight:-23,
        marginTop: -12,
      },
    cCProgressTextSmall: {
        fontSize: 25,
        color: '#69cccc',
        fontWeight: 'bold',
        marginRight:-23,
        marginTop: -12,
      },
    cCChancesContainer: {
        position: 'absolute',
        top: 4,
        right: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cCChancesText: {
        fontSize: 14,
        color: '#555',
        marginRight: 5,
    },
    cCChancesTextSmall: {
        fontSize: 12,
        color: '#555',
        marginRight: 5,
    },

    cCHeartsContainer: {
        flexDirection: 'row',
    },
    cCHeartIcon: {
        width: 18,
        height: 16,
        marginLeft:2,
    },
    cCHeartIconSmall: {
        width: 15,
        height: 13,
        marginLeft:2,
    },
    cCPageContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    cCBackButton: {
        fontSize: 24,
        color: '#48bcbc',
    },
    cCSearchButtonContainer1: {
        zIndex: 2,
        position: 'absolute',
        right: 55, 
    },
    cCSearchButton: {
        fontSize: 24,
        color: '#48bcbc',
      },
    cCSearchFilterContainer: {
        zIndex:-1,
        marginRight: -5,
    },
    cCFilterIcon:{ 
        color:"#00A3A3",
    },
    cCSearchBarOverlay1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: 120, // Adjust this value to leave space for the back button
        paddingTop: 13, // Adjust this value if needed to align the search bar with the header
        backgroundColor: '#F5F5F5',
        paddingRight: 50,
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
      },

    cCSearchInput: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        height: 45,
        borderWidth: 0, // Remove border width to avoid the line
        borderBottomWidth: 0, // Ensure bottom border is removed
        borderRadius: 20, // Apply high border radius for rounded corners
        borderColor: 'transparent', // Set border color to transparent
        paddingLeft: 20,
        paddingRight: 30, // Add padding to the right to make space for the icon
    },






    fCHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },

    fCScrollViewContent: {
        paddingBottom: 140,
    },

    fCCardContainer: {
        paddingBottom: 500,
    },

    fCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: '95%',
        alignSelf: 'center',
      },
    fCHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },  
    fCCardHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    fCCardUser: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    fCCardTitle: {
        flexDirection: 'column',
        flex: 1,
    },
    fCCardSubtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    fCTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fCChallenge: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        fontWeight:'bold',
    },
    fCProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
    },
    fCDetailsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    fCDate: {
        fontSize: 12,
        color: '#777',
        marginRight: 5,
    },
    fCLimit: {
        fontSize: 12,
        color: '#777',
        marginLeft: 5,
    },
    fCID: {
        fontSize: 12,
        color: '#74ceca',
        position: 'absolute',
        top: 4,
        right: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fCDetails: {
        fontSize: 12,
        color: '#777',
      },
    fCChancesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
    },
    fCChancesText: {
        fontSize: 14,
        color: '#555',
        marginRight: 5,
        fontWeight:'bold'
    },
    fCHeartsContainer: {
        flexDirection: 'row',
    },
    fCHeartIcon: {
        width: 19,
        height: 17,
        marginLeft: 2,
    },



    fCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: '95%',
        alignSelf: 'center',
      },
    fCHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },  
    fCCardHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    fCCardUser: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    fCCardTitle: {
        flexDirection: 'column',
        flex: 1,
    },
    fCCardSubtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    fCTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fCChallenge: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        fontWeight:'bold',
    },
    fCProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
    },
    fCDetailsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    fCDate: {
        fontSize: 12,
        color: '#777',
        marginRight: 5,
    },
    fCLimit: {
        fontSize: 12,
        color: '#777',
        marginLeft: 5,
    },
    fCID: {
        fontSize: 12,
        color: '#74ceca',
        position: 'absolute',
        top: 4,
        right: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fCDetails: {
        fontSize: 12,
        color: '#777',
      },
    fCChancesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
    },
    fCChancesText: {
        fontSize: 14,
        color: '#555',
        marginRight: 5,
        fontWeight:'bold'
    },
    fCHeartsContainer: {
        flexDirection: 'row',
    },
    fCHeartIcon: {
        width: 19,
        height: 17,
        marginLeft: 2,
    },



    zCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: '95%',
        alignSelf: 'center',
        position: 'relative',
    },
    zCCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    zCCardUserIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    zCProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: -20,
        borderWidth: 2,
        borderColor: '#fffcec',
    },
    zCCardTitle: {
        flexDirection: 'row',
        flex: 1,
    },
    zCTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    zCChallenge: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        fontWeight: 'bold',
    },
    zCChancesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
    },
    zCChancesText: {
        fontSize: 14,
        color: '#555',
        marginRight: 5,
        fontWeight: 'bold',
    },
    zCHeartsContainer: {
        flexDirection: 'row',
    },
    zCHeartIcon: {
        width: 19,
        height: 17,
        marginLeft: 2,
    },
    zCDetailsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    zCDate: {
        fontSize: 12,
        color: '#777',
        marginRight: 5,
    },
    zCDash: {
        fontSize: 12,
        color: '#777',
    },
    zCLimit: {
        fontSize: 12,
        color: '#777',
        marginLeft: 5,
    },
    zCID: {
        fontSize: 12,
        color: '#74ceca',
        position: 'absolute',
        top: 4,
        right: 2,
    },
    zCDetails: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
    },
    





   
    
   

    





    

    
});


