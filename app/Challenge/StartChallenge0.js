
import React, { useState, useEffect } from 'react';
import { Alert, Modal, Dimensions,  StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width)

const StartChallenge0 = () => {
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
    

      const handleBackButtonPress = () => {
        setBackAlertVisible(true);
      };
    
      const handleBackAlertConfirm = () => {
        setBackAlertVisible(false);
        navigation.goBack(); 
      };

      
    return(

    <SafeAreaView style={styles.sCContainer}>
        <ScrollView contentContainerStyle={styles.sCScrollViewContent}>
        
        <View style={styles.sCHeader}>
            <TouchableOpacity onPress={handleBackButtonPress}>
                <Octicons name="chevron-left" size={30} color="#00A3A3" marginRight={10} />
            </TouchableOpacity>
            {!showSearchBar && (
                <Text style={styles.sCHeaderText}>發起挑戰</Text>
            )}
            <TouchableOpacity style={styles.sCSearchButtonContainer} onPress={() => setShowSearchBar(!showSearchBar)}>
                <Ionicons name="search" size={35} style={styles.sCSearchButton} />
            </TouchableOpacity>
            
        </View>
        
        {showSearchBar && (
            <View style={styles.sCSearchBarOverlay}>
                <TextInput 
                style={styles.sCSearchInput} 
                placeholder="Search..."
                placeholderTextColor="#aaa"
                
                />
            </View>
        )}
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
                
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>結束日期</Text>
                <TextInput
                mode="outlined"
                style={styles.input}
                
                />
            </View>
        
            <TouchableOpacity style={styles.sCConfirmButton} onPress={() =>navigation.navigate('StartChallenge')}>
                <Text style={styles.sCConfirmButtonText}>確認</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={backAlertVisible}
                onRequestClose={() => {
                    setBackAlertVisible(!backAlertVisible);
                }}
                >
                <View style={styles.modalOverlay}>
                    <View style={styles.backAlertContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setBackAlertVisible(false)}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.backAlertText}>如果按返回，所有填寫資料不會被保留。</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setBackAlertVisible(false)}>
                        <Text style={styles.buttonText}>再想想</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleBackAlertConfirm}>
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

export default StartChallenge0;

const styles = StyleSheet.create({
    sCContainer: {
        flex: 1,
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
      
    sCSearchButtonContainer: {
        zIndex: 2,
        position: 'absolute',
        right: 15, 
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
    sCScrollViewContent: {
        paddingBottom: 140,
        backgroundColor:'#fffcfc',     
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

      inputContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
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
      confirmButton: {
        backgroundColor: '#48bcbc',
        padding: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
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