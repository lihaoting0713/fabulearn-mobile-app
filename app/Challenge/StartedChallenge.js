
import React, { useState, useEffect } from 'react';
import { Alert, Modal, Dimensions,  StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width)

const StartedChallenge = () => {
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


      
      const handleDetailsPress = (message) => {
        // Navigate to the VideoPlayer screen
        navigation.navigate('StartedChallengeDetails', {message});
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


    return(

    <SafeAreaView style={styles.cCPageContainer}>                    
        <ScrollView  contentContainerStyle={styles.cCScrollViewContent} >
        <View style={styles.cCHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={10}/>
            </TouchableOpacity>
            {!showSearchBar && (
                <Text style={styles.cCHeaderText}>已發起挑戰</Text>
            )}
            <TouchableOpacity style={styles.cCSearchButtonContainer1} onPress={() => setShowSearchBar(!showSearchBar)}>
                <Ionicons name="search" size={35} style={styles.cCSearchButton} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cCSearchFilterContainer} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="dots-vertical" size= {30} style={styles.cCFilterIcon}/> 
            </TouchableOpacity>
    
        </View>
        {showSearchBar && (
            <View style={styles.cCSearchBarOverlay1}>
                <TextInput 
                style={styles.cCSearchInput} 
                placeholder="Search..."
                placeholderTextColor="#aaa"
                
                />
            </View>
        )}
        {data.map((item) => (
            <TouchableOpacity key={item.id} style={styles.zCCard} onPress={()=>handleDetailsPress(item)}>
                <View style={styles.zCCardHeader}>
                    <View style={styles.zCCardUserIcons}>
                        {Array(6).fill().map((_, index) => (
                            <Image key={index} source={require('../pictures/Account Icon Black.png')} style={styles.zCProfileImage} />
                        ))}
                    </View>
                    <Text style={styles.zCID}>{`#${item.id}`}</Text>
                </View>
                <View style={styles.zCCardTitle}>
                    <Text style={styles.zCChallenge}>{item.challenge}</Text>
                    <View style={styles.zCChancesContainer}>
                        <Text style={styles.zCChancesText}>機會</Text>
                        <View style={styles.zCHeartsContainer}>
                            <Image source={require('../pictures/Heart Full.png')} style={styles.zCHeartIcon} />
                            <Image source={require('../pictures/Heart Full.png')} style={styles.zCHeartIcon} />
                            <Image source={require('../pictures/Heart Empty.png')} style={styles.zCHeartIcon} />
                        </View>
                    </View>
                </View>
                <View style={styles.zCDetailsContainer}>
                    <Text style={styles.zCDate}>{item.dateStart}</Text>
                    <Text style={styles.zCDash}> - </Text>
                    <Text style={styles.zCLimit}>{item.dateEnd}</Text>
                </View>
                <Text style={styles.zCDetails}>{item.details}</Text>
            </TouchableOpacity>
        ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>搜尋篩選器</Text>
                            <View style={styles.filterOptionsContainer}>
                                <TouchableOpacity onPress={() => setSelectedOption('挑戰者')}>
                                <Text style={[styles.filterOption, selectedOption === '挑戰者' && styles.selectedFilterOption]}>挑戰者</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedOption('系統')}>
                                <Text style={[styles.filterOption, selectedOption === '系統' && styles.selectedFilterOption]}>系統</Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={styles.filterButtonContainer}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>確定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        <BottomNavBar />
    </SafeAreaView>
        

)};

export default StartedChallenge;

const styles = StyleSheet.create({


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




    cCPageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cCScrollViewContent: {
        paddingBottom: 140,
    },
    cCHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        width: '100%',
    },
    cCHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
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

 

});