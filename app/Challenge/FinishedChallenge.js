
import React, { useState, useEffect } from 'react';
import { Alert, Modal, Dimensions,  StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width)

const FinishedChallenge = () => {
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
        navigation.navigate('FinishedChallengeDetails', {message});
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
                <Text style={styles.cCHeaderText}>已完成挑戰</Text>
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
            <TouchableOpacity key={item.id} style={styles.fCCard} onPress={()=>handleDetailsPress(item)}>
                <View style={styles.fCCardHeader}>
                    <View style={styles.fCCardUser}>
                        <Image source={require('../pictures/Account Icon Black.png')} style={styles.fCProfileImage}/>
                        <Text style={styles.fCTitle}>{item.name}</Text>
                    </View>
                    <View style={styles.fCCardTitle}>
                        <View style={styles.fCCardSubtitle}>                                   
                            <Text style={styles.fCChallenge}>{item.challenge}</Text>
                            <View style={styles.fCChancesContainer}>
                                <Text style={styles.fCChancesText}>機會</Text>
                                <View style={styles.fCHeartsContainer}>
                                    <Image source={require('../pictures/Heart Full.png')} style={styles.fCHeartIcon} />
                                    <Image source={require('../pictures/Heart Full.png')} style={styles.fCHeartIcon} />
                                    <Image source={require('../pictures/Heart Empty.png')} style={styles.fCHeartIcon} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.fCDetailsContainer}>
                            <Text style={styles.fCDate}>{item.dateStart} </Text>
                            <Text>-</Text>
                            <Text style={styles.fCLimit}>{item.dateEnd}</Text>
                        </View>
                        <Text style={styles.fCDetails}>{item.details}</Text> 
                    </View>
                    <Text style={styles.fCID}>{`#${item.id}`}</Text>
                </View>
                
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

export default FinishedChallenge;

const styles = StyleSheet.create({
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