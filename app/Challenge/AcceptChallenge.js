
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Modal, Dimensions,  StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios'; 

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width)

const AcceptChallenge = () => {
    const navigation = useNavigation();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('挑戰者');
    const [challengeDetails, setChallengeDetails] = useState([]);
    const [searchtext,setSearchtext] = useState("")
    const [originalChallengesDetails,  setOriginalChallengesDetails] = useState([]);

    const getsearchdata = async (challenges, searchtext) => {
      let filteredChallenges = challenges;
      console.log(`searchtext: ${searchtext}`);
      if (searchtext) {
        filteredChallenges = filteredChallenges.filter(item => item.title === searchtext);
      }
      return filteredChallenges;
    };

    const handleSearch = async () => {
      const filteredChallenges = await getsearchdata(originalChallengesDetails, searchtext);
      setChallengeDetails(filteredChallenges);
    };
  
    const handleSearchTextChange = useCallback((text) => {
      setSearchtext(text);
    }, []);


    const fetchItems = async () => {
      const baseURL = 'http://192.168.18.12/api';
  
      let response;
      try {
        console.log('Attempting to log in...');
        response = await axios.post(`${baseURL}/login`, {
          login_id: 'student1@testing.com',
          password: 'demo'
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        });
        console.log('Login response:', response);
      } catch (error) {
        console.error('Error logging in:', error.message);
        console.error('Error details:', error);
        return;
      }
  
      let options = {};
      let headers = {
        'Content-Type': 'multipart/form-data'
      };
  
      if ('set-cookie' in response.headers) {
        let cookie = response.headers['set-cookie'][0].split(';')[0];
        headers['Cookie'] = cookie;
      } else {
        options['withCredentials'] = true;
      }
      options['headers'] = headers;
  
      try {
        const url = `${baseURL}/bliss/challenges`;
        console.log('Making request to:', url);
        const challengeResponse = await axios.get(url, options);
        console.log('Challenges response:', challengeResponse);
        const data = challengeResponse.data;
  
        if (data.success) {
          const topicItems = data.data.results;
          console.log('Fetched items:', topicItems);
          setChallengeDetails(topicItems);
          setOriginalChallengesDetails(topicItems);
        } else {
          console.error('Failed to fetch video data:', data);
        }
      } catch (error) {
        console.error('Error fetching video data:', error.message);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
      }
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    useEffect(() => {
      console.log('Updated Challenge details state:', challengeDetails);
    }, [challengeDetails]);


      const handleDetailsPress = (videoId) => {
        navigation.navigate('AcceptChallengeDetails', {videoId});
      };


    const renderHearts = (chance) => {
      const hearts = [];
      for (let i = 0; i < 3; i++) {
        hearts.push(
          <Image
            key={i}
            source={i < chance ? require('../pictures/Heart Full.png') : require('../pictures/Heart Empty.png')}
            style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]}
          />
        );
      }
      return hearts;
    };
      
      
    return(

        <SafeAreaView style={styles.aCPageContainer}>    

            <ScrollView  contentContainerStyle={styles.aCScrollViewContent1} >
            <View style={styles.aCHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={10}/>
                </TouchableOpacity>
                {!showSearchBar && (
                    <Text style={styles.aCHeaderText}>接受挑戰</Text>
                )}
                <TouchableOpacity style={styles.aCSearchButtonContainer1} onPress={() => setShowSearchBar(!showSearchBar)}>
                    <Ionicons name="search" size={35} style={styles.aCSearchButton} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.aCSearchFilterContainer} onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name="dots-vertical"    size= {30} style={styles.aCFilterIcon}/>
                </TouchableOpacity>
            </View>
            {showSearchBar && (
                <View style={styles.aCSearchBarOverlay1}>
                    <TextInput 
                    style={styles.aCSearchInput} 
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    value={searchtext}
                    onChangeText={handleSearchTextChange}
                    onSubmitEditing={handleSearch}
                    
                    />
                </View>
            )}
               {challengeDetails.length > 0 ? (
                    challengeDetails.map((item) => (
                      <View key={item.id} style={styles.aCCard}>
                        <View style={styles.aCCardHeader}>
                          <View style={styles.aCCardTitle1}>
                            <Text style={styles.aCTitle}>{`#${item.id}`}</Text>
                            <Image source={require('../pictures/Account Icon Black.png')} style={styles.aCProfileImage} />
                          </View>
                          <View style={styles.aCCardTitle2}>
                            <Text style={[styles.aCSubtitle, isSmallScreen && styles.aCSubtitleSmall]}>{item.title}</Text>
                            <Text style={[styles.aCDetails, isSmallScreen && styles.aCDetailsSmall]}>限時{item.total_day}日   {item.no_of_video_per_day} 條片 / 日</Text>
                          </View>
                        </View>           
                        <View style={styles.aCChancesContainer}>
                          <Text style={[styles.aCChancesText, isSmallScreen && styles.aCChancesTextSmall]}>機會</Text>
                          <View style={styles.aCHeartsContainer}>
                            {renderHearts(item.chance)}
                          </View>
                        </View>
                        <View style={styles.aCCardActions}>
                          <TouchableOpacity style={styles.aCRejectButton}>
                            <Text style={styles.aCButtonText}>拒絕</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.aCDetailsButton} onPress={() => handleDetailsPress(item.id)}>
                            <Text style={styles.aCButtonText}>詳情</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noDataText}>No challenges available</Text>
                  )}
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

export default AcceptChallenge;

const styles = StyleSheet.create({
    aCPageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    aCScrollViewContent1: {
        paddingBottom: 140,
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
        marginRight: 10,
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
        fontSize: 12,
        color: '#555',
        padding: 5,
    },   
    aCDetails: {
        fontSize: 12,
        color: '#777',
        padding: 5,
    },
    aCDetailsSmall: {
        fontSize: 12,
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