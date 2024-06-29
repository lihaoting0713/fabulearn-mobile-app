import React, { useState} from 'react';
import { View, Modal, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation } from '@react-navigation/native';


const challengesData = {
  continuing: [
    { id: 1, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 45, daysLeft: 4 },
    { id: 2, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 45, daysLeft: 4 },
    { id: 3, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 45, daysLeft: 4 },
  ],
  completed: [
    { id: 4, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 100, status: '已完成' },
    { id: 5, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 100, status: '已完成' },
  ],
  failed: [
    { id: 6, dateRange: '12 / 12 / 2023 - 13 / 12 / 2023', name: '小明', progress: 45, status: '未能完成' },
  ],
};

const StartedChallengeSummary= () => {

    const navigation = useNavigation();
const [showSearchBar, setShowSearchBar] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [selectedOption, setSelectedOption] = useState('挑戰者');


  const renderChallengeItem = (challenge, category) => {
    return (
      <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.cardHeader}>
                <Image source={require('../pictures/Account Icon Black.png')} style={styles.profileImage} />
                <Text style={styles.challengeName}>{challenge.name}</Text>
            </View>
            
            
            <View style={styles.progressContainer}>
                <Text style={styles.dateRange}>{challenge.dateRange}</Text>
                    <View style={styles.progressInfo}>
                        <Text style={styles.progressText}>進度 {challenge.progress}%</Text>
                        {category === 'continuing' && <Text style={styles.daysLeft}>餘下 {challenge.daysLeft} 日</Text>}
                        {category === 'completed' && <Text style={styles.completed}>{challenge.status}</Text>}
                        {category === 'failed' && <Text style={styles.failed}>{challenge.status}</Text>}
                    </View>
                    <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, { width: `${challenge.progress}%` }]} />
                    <View style={[styles.progressBarEmpty, { width: `${100 - challenge.progress}%` }]} />
                    
                </View>
            
            </View>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.cCScrollViewContent}>
            <View style={styles.cCHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={10}/>
                </TouchableOpacity>
                {!showSearchBar && (
                    <Text style={styles.cCHeaderText}>挑戰1：10日數學自習</Text>
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
        <Text style={styles.sectionTitle}>進行中</Text>
        {challengesData.continuing.map((challenge) => renderChallengeItem(challenge, 'continuing'))}

        <Text style={styles.sectionTitle}>已完成</Text>
        {challengesData.completed.map((challenge) => renderChallengeItem(challenge, 'completed'))}

        <Text style={styles.sectionTitle}>失敗</Text>
        {challengesData.failed.map((challenge) => renderChallengeItem(challenge, 'failed'))}

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
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    cCScrollViewContent: {
        paddingBottom: 140,
        padding: 16,
    },
    cCHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
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
        paddingTop: 19, // Adjust this value if needed to align the search bar with the header
        backgroundColor: 'white',
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left',
    },
    challengeCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'center',
        marginLeft: 30,
    },
    
    cardHeader: {
        paddingRight: 20,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fffcec',
        marginBottom: 20,
        padding: 10,
        paddingLeft: 20,
        
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginTop: 10,
    },
    dateRange: {
      fontSize: 14,
      color: '#999',
      marginTop: 10,
    },
    progressInfo:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    challengeName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    progressContainer: {
       marginRight: 30,   
        flexDirection: 'column',
        alignItems: 'flex-start', 
        backgroundColor: '#fffcec',
        paddingBottom: 10,
    },
    progressText: {
      fontSize: 20,
      color: '#00A3A3',
      marginTop: 10,
    },
    progressBarContainer: {
      flexDirection: 'row',
      height: 20,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#e0e0e0',
      marginBottom: 6.5,
      width: '90%',
      
    },
    progressBarFill: {
      backgroundColor: '#00A3A3',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    progressBarEmpty: {
      backgroundColor: '#e0e0e0',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    daysLeft: {
      fontSize: 14,
      color: '#FF6F61',
      marginTop: 10,
    },
    completed: {
      fontSize: 14,
      color: '#00A3A3',
      marginTop: 10,
    },
    failed: {
      fontSize: 14,
      color: '#FF6F61',
      marginTop: 10,
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
  });

export default StartedChallengeSummary;
